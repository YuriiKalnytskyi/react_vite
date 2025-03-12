import {Dispatch, SetStateAction, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useTheme} from 'styled-components';

import arrowsDownUpIcon from '@/assets/icons/default/arrows-down-up.svg';
import swipe from '@/assets/icons/default/swipe.svg';
import {CheckBox, Icon, Pagination} from '@/module/common/component';
import {usePortalPositioning} from '@/module/common/hooks';

import * as Styled from './table.styled';

export type Obj = Record<string, unknown>;
export type Item = Obj | string;
export type Items = Item[];

export interface ITableProps<I extends Items> {
    arrayHeader: {
        text: string;
        data_key: string;
        className?: 'title' | 'id' | string;
        isOrder?: boolean;
        isResizer?: boolean;
    }[];
    arrayBody: I;
    parseValue?: (
        value: I[number][keyof I[number]],
        key: string,
        valueObj: I[number],
        index: number
    ) => unknown;
    onNavigate?: (value: I[number]) => void;
    pagination?: {
        total: number;
        page: number;
        pageSize: number;
        setPage: (page: number) => void;
    };
    select?: {
        row_id: keyof I[number];
        items: I[number][keyof I[number]][];
        setItems: Dispatch<SetStateAction<I[number][keyof I[number]][]>>;
        isAllSelect: boolean
    };
    className?: 'scroll' | 'table' | 'full' | 'pointer' | string;
    tooltipLength?: number;
    linesToTruncate?: number;
    onOrderColumn?: (data_key: string) => void;
}

export const TableIndex = <I extends Items>({
                                                arrayHeader,
                                                arrayBody,
                                                parseValue,
                                                onNavigate,
                                                select,
                                                className,
                                                onOrderColumn,
                                                tooltipLength,
                                                linesToTruncate
                                            }: ITableProps<I>) => {
    const {t} = useTranslation('translation', {keyPrefix: 'common'});

    const theme = useTheme();

    const [focused, setFocused] = useState<string | null>(null);
    const dynamicRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const {setting, Component} = usePortalPositioning(
        focused ? dynamicRefs.current[focused] : null,
        !!focused,
        true
    );


    const [columnWidths, setColumnWidths] = useState<{ [key: string]: number }>({
        title: 240,
        id: 80
    });

    const onResizerColumn = (e: MouseEvent, key: string) => {
        e.preventDefault();
        const startX = e.clientX;
        const initialWidth = columnWidths[key] || 150;

        const handleMouseMove = (event: MouseEvent) => {
            const newWidth = initialWidth + (event.clientX - startX);
            setColumnWidths((prevWidths) => ({
                ...prevWidths,
                [key]: Math.max(newWidth, 50),
            }));
        };

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    return (
        <Styled.Table className={className ?? ''}>
            <Styled.Head>
                <Styled.Row>
                    {arrayHeader.map((v, i) => (
                        <Styled.HeadRow
                            className={v.className ?? 'title'}
                            key={i}
                            style={{width: columnWidths[v.data_key] ?? columnWidths['title'] ?? "auto"}}
                        >
                            {onOrderColumn && v?.isOrder && (
                                <Icon
                                    icon={arrowsDownUpIcon}
                                    height='1rem'
                                    background={theme.COLORS.black}
                                    cursor='pointer'
                                    className='order'
                                    onClick={onOrderColumn.bind(this, v.data_key)}
                                />
                            )}
                             {v.text}


                            {
                                v.isResizer && (
                                    <Icon
                                        icon={swipe}
                                        onMouseDown={(e: MouseEvent) => onResizerColumn(e, v.data_key ?? 'title')}
                                        className='resizer'
                                    />
                                )
                            }
                        </Styled.HeadRow>
                    ))}
                    {select && select.isAllSelect ? (
                        <Styled.HeadRow className='checkbox'>
                            <CheckBox
                                name='selet'
                                type='default'
                                items=''
                                noFormikValue={{
                                    value: select.items.length === arrayBody.length,
                                    onSetValue: (_, value) => {
                                        if (value) {
                                            // @ts-ignore
                                            const items = arrayBody.map((v) => v[select.row_id]);
                                            select?.setItems(items);
                                            return;
                                        }
                                        select?.setItems([])
                                    }
                                }}
                            />
                        </Styled.HeadRow>
                    ) : null}
                </Styled.Row>
            </Styled.Head>

            <Styled.Body>
                {arrayBody.length ? (
                    arrayBody.map((value: any, index) => {
                        return (
                            <Styled.Row
                                key={`row_${index}`}
                            >
                                {arrayHeader.map((v, i) => {
                                    const _value = parseValue
                                        ? parseValue(value[v.data_key], v.data_key, value, index)
                                        : value[v.data_key] ?? '';
                                    const key = `td${index}_${i}`;
                                    const content = typeof _value === 'boolean' ? _value.toString() : _value ?? '';

                                    const onSetFocused = () => {
                                        if (content.length > (tooltipLength ?? 16)) {
                                            setFocused(key);
                                        }
                                    };
                                    const onSetFocusedOut = () => setFocused(null);

                                    return (
                                        <Styled.Data
                                            className={v?.className ?? 'title'}
                                            style={{width: columnWidths[v.data_key] ?? columnWidths['title'] ?? "auto"}}
                                            key={key}
                                            onMouseEnter={onSetFocused}
                                            onMouseOut={() => setFocused(null)}
                                            onClick={onNavigate?.bind(this, value)}
                                        >
                                            {content ? (
                                                <Styled.ItemLabel
                                                    $linesToTruncate={linesToTruncate ?? 3}
                                                    ref={(el: HTMLDivElement | null) => {
                                                        if (content.length > (tooltipLength ?? 16)) {
                                                            if (!dynamicRefs.current[key]) {
                                                                dynamicRefs.current[key] = null;
                                                            }
                                                            dynamicRefs.current[key] = el;
                                                        }
                                                    }}
                                                    onMouseEnter={onSetFocused}
                                                    onMouseOut={onSetFocusedOut}
                                                >
                                                    {content}
                                                </Styled.ItemLabel>
                                            ) : null}

                                            {focused === key && (
                                                <Component>
                                                    <Styled.Tooltip
                                                        id={`table_tooltip_${key}`}
                                                        style={{
                                                            top: setting?.top - setting.clientHeight,
                                                            left: setting?.left + setting.width / 4
                                                        }}
                                                        onMouseEnter={onSetFocused}
                                                        onMouseOut={onSetFocusedOut}
                                                    >
                                                        {content}
                                                    </Styled.Tooltip>
                                                </Component>
                                            )}
                                        </Styled.Data>
                                    );
                                })}
                                {select ? (
                                    <Styled.Data className='checkbox'>
                                        <CheckBox
                                            name='selet'
                                            type='default'
                                            items=''
                                            noFormikValue={{
                                                value: select?.items.some((item) => item === value[select.row_id]),
                                                onSetValue: () => {
                                                    if (!(select?.items ?? []).includes(value[select.row_id])) {
                                                        return select?.setItems([...(select?.items ?? []), value[select.row_id]]);
                                                    }

                                                    select?.setItems((select?.items ?? []).filter((item) => item !== value[select.row_id]));
                                                }
                                            }}
                                        />
                                    </Styled.Data>
                                ) : null}
                            </Styled.Row>
                        );
                    })
                ) : (
                    <Styled.Row className='center'>{t('no_data')}</Styled.Row>
                )}
            </Styled.Body>
        </Styled.Table>
    );
};

export const Table = <I extends Items>(props: ITableProps<I>) => {
    const ContainerWrapper = props.className === 'scroll' ? Styled.Container : Styled.Wrapper;

    return (
        <>
            <ContainerWrapper
                className={props.className ?? ''}
                id={props.className !== 'scroll' ? 'tableContainer' : undefined}
            >
                <TableIndex {...props} />
            </ContainerWrapper>
            {props.pagination && props.pagination.total > props.pagination.pageSize && (
                <Styled.WrapperPagination>
                    <Pagination
                        onPageChange={(page) => {
                            props.pagination?.setPage(page);
                        }}
                        currentPage={props.pagination?.page}
                        totalCount={props.pagination.total}
                        pageSize={props.pagination.pageSize}
                    />
                </Styled.WrapperPagination>
            )}
        </>
    );
};
