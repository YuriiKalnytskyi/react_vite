import axios from 'axios';
import {Form, Formik, getIn} from 'formik';
import {useState} from 'react';
import {useQuery, UseQueryResult} from 'react-query';

import testIcon from '@/assets/icons/vite.svg';
import {
    Button,
    Calendar,
    CheckBox, File,
    Icon,
    Input,
    Inputs,
    MatchedWords,
    OTP,
    Switch,
    Table,
    TextArea, toast
} from '@/module/common/component';
import {changeCard} from '@/module/common/hooks';
import {onError} from '@/module/common/services';
import {TagCommon, TextCommon} from '@/module/common/styles';
import {validationSchemaExample} from '@/module/example/validation/shema.ts';
import {SPACES} from '@/theme';
import {dateTransform, functionStub} from '@/utils';
import arrowBottomIcon from '@/assets/icons/default/arrow-bottom-icon.svg';

import * as Styled from './example.styled.tsx';
import {APP_KEYS} from '../common/constants/index.ts';
import {DrawerLayout, PopupLayout} from '@/module/common/layout';
import {useThemeStore} from '@/store';
import {DropDown} from '@/module/common/component/drop-down/drop-down.tsx';
import {useTheme} from 'styled-components';
import {Accordion} from '@/module/common/component/accordion/accordion.tsx';
import {DragAndDrop} from '@/module/common/component/drag-and-drop/drag-and-drop.tsx';

const randomString = (minLength: number, maxLength: number): string => {
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};


//TODO replace the plus cone

//InputMatchedWords
//TODO search input correct startIcon
//TODO remove focus from input after selecting an item

//Input
//TODO add arrows for number type
//TODO CAPSLOCK check


//Loader
//TODO optimization loader ...

//Phone
//TODO delete component and to DropDown ...

//Pagination
//TODO add input to ...

//Calendar
//TODO check click to calendar ...

export const Example = () => {
    const {theme: themeStore, setTheme} = useThemeStore();
    const theme = useTheme();

    const [page, setPage] = useState(1);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openPopup, setOpenPopup] = useState(false);
    const [slidePosition, setSlidePosition] = useState<'bottom' | 'top' | 'left' | 'right' | 'center'>('bottom');
    const [contentPosition, setContentPosition] = useState<'bottom' | 'top' | 'center' | 'left' | 'right'>('bottom');
    const [slidePositionDrawer, setSlidePositionDrawer] = useState<'bottom' | 'top' | 'left' | 'right'>('right');
    const [contentPositionDrawer, setContentPositionDrawer] = useState<'bottom' | 'top' | 'left' | 'right'>('right');

    const dataTable = Array.from({length: 6}, (_, index) => ({
        id: index + 1,
        user: page % 2 === 0 ? (index % 2 === 0 ? 'Tester' : randomString(50, 1000)) : (index % 2 === 0 ? randomString(50, 500) : 'Tester'),
        email: 'tester@gmail.com',
        amount: 150,
        currency: 'USD',
        createdAt: '2025-01-03T12:34:56.789Z'
    }));

    const {data}: UseQueryResult<{
        countries: {
            name: string;
            icon: string;
            cca2: string;
            phone: string;
        }[]
    }> = useQuery(
        ['country'],
        async () => {
            const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,flags,cca2,idd');
            const countries = response.data.map((country: any) => ({
                name: country.name.common,
                icon: country.flags?.svg,
                cca2: country.cca2,
                phone: country.idd.root + country.idd?.suffixes.join('')
            }));
            return {countries};
        },
        {
            onError: (err: any) => {
                onError(err);
            }
        }
    );

    const onTogglePopup = (slidePosition: 'bottom' | 'top' | 'left' | 'right' | 'center' | null, contentPosition: 'bottom' | 'top' | 'center' | 'left' | 'right' | null) => {
        setOpenPopup((prev) => !prev);
        slidePosition && setSlidePosition(slidePosition);
        contentPosition && setContentPosition(contentPosition);

    };
    const onToggle = (slidePosition: 'bottom' | 'top' | 'left' | 'right' | null, contentPosition: 'bottom' | 'top' | 'left' | 'right' | null) => {
        setOpenDrawer((prev) => !prev);
        slidePosition && setSlidePositionDrawer(slidePosition);
        contentPosition && setContentPositionDrawer(contentPosition);
    };

    const generateRandomRows = (count: number, columnRange: [number, number], isColumnId: boolean) => {
        const [minColumn, maxColumn] = columnRange;
        return Array.from({length: count}, (_, index) => ({
            title: `title ${index + 1}`,
            id: index + 1,
            ...(isColumnId ? {column_id: Math.floor(Math.random() * (maxColumn - minColumn + 1)) + minColumn} : {})
        }));
    };

    const [dragAndDropColumn, setDragAndDropColumn] = useState(
        {
            columns: [
                {title: 'columns1', id: 1},
                {title: 'columns2', id: 2},
                {title: 'columns3', id: 3}
            ],
            rows: generateRandomRows(9, [1, 3], true)
        }
    );

    const [dragAndDropRows, setDragAndDropRows] = useState(
        {
            rows: generateRandomRows(9, [1, 3], false)
        }
    );

    const [order, setOrder] = useState<[string, string][]>([])
    const [items, setItems] = useState<(string | number)[]>([])

    return (
        <Styled.Container
            height="100dvh"
            fd="column"
            gap={SPACES.xxxxl}
            padding={`${SPACES.xxxxl} ${SPACES.xxxxl}`}
        >
            <button
                onClick={() => {
                    setTheme(themeStore === 'light' ? 'dark' : 'light');
                }}
            >
                {themeStore === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            </button>
            <TagCommon gap={SPACES.l}>
                BUTTON STATE
                <TagCommon fd="row" gap={SPACES.l}>
                    <Button
                        content="button"
                        variant="primary"
                        startIcon={{icon: testIcon, height: '1.5rem'}}
                        endIcon={{icon: testIcon, height: '1.5rem', type: 'img'}}
                    />
                    <Button content="button" variant="primary" isLoading={true}/>
                    <Button content="button" variant="primary" disabled/>
                    <Button.AsNavLink
                        to={APP_KEYS.ROUTER_KEYS.HOME}
                        content="navigation button "
                    />
                </TagCommon>
            </TagCommon>

            <Table
                className="scroll"
                tooltipLength={25}
                linesToTruncate={2}
                arrayHeader={[
                    {text: 'Id', data_key: 'id', isOrder: true, className: 'id'},
                    {text: 'User', data_key: 'user', isResizer: true},
                    {text: 'Email', data_key: 'email', isResizer: true},
                    {text: 'Amount', data_key: 'amount'},
                    {text: 'Currency', data_key: 'currency'},
                    {text: 'Date', data_key: 'createdAt'},
                ]}
                arrayBody={dataTable ?? []}
                parseValue={(value, key) => {
                    if (key === 'createdAt') return dateTransform((value as string) ?? '');
                    return value;
                }}
                select={{
                    setItems,
                    items,
                    row_id: 'id',
                    isAllSelect: true
                }}
                pagination={{
                    total: 100,
                    page: page,
                    pageSize: 5,
                    setPage: (page) => {
                        setPage(page);
                    }
                }}
                onOrderColumn={(data_key) => {
                    const existingIndex = order.findIndex(([key]: [string, string]) => key === data_key);

                    let newOrder: [string, string][] = [];

                    if (existingIndex === -1) {
                        newOrder = [[data_key, 'ASC']];
                    } else if (order[existingIndex][1] === 'ASC') {
                        newOrder = [[data_key, 'DESC']];
                    }

                    setOrder(newOrder);
                }}

            />

            <Formik
                initialValues={{
                    password: '',
                    email: '',
                    first_name: '',
                    last_name: 'test',
                    card: '',
                    expiry_data: '',
                    cvv: '',
                    phone: ''
                    // resizable: randomString(50, 1000)
                }}
                onSubmit={functionStub}
                validationSchema={validationSchemaExample}
            >
                {({values, setFieldValue}) => (
                    <Form>
                        CHECKBOX STATE (default, multi, radio)
                        <TagCommon fd="row" gap={SPACES.l} margin="0 0 2rem 0">
                            <TagCommon height="100px" fd="row" ai="center" gap={SPACES.l}>
                                <Inputs.CheckBox name="default" type="default" items="string"/>
                                <CheckBox
                                    name="defaultObj"
                                    type="default"
                                    items={{name: 'obj'}}
                                    visibleItem="name"
                                />
                            </TagCommon>
                            <TagCommon height="100px" fd="row" ai="center" gap={SPACES.l}>
                                <TagCommon width="fit-content" gap={SPACES.l}>
                                    <CheckBox name="multi" type="multi" items={['string_1', 'string_2', 'string3']}/>
                                </TagCommon>
                                <TagCommon gap={SPACES.l}>
                                    <CheckBox
                                        name="multiObj"
                                        type="multi"
                                        items={[{name: 'obj_1'}, {name: 'obj_2'}, {name: 'obj_3'}]}
                                        visibleItem="name"
                                    />
                                </TagCommon>
                            </TagCommon>
                            <TagCommon height="100px" fd="row" ai="center" gap={SPACES.l}>
                                <TagCommon width="fit-content" gap={SPACES.l}>
                                    <CheckBox name="radio" type="radio" items={['string_1', 'string_2']}/>
                                </TagCommon>
                                <TagCommon gap={SPACES.l}>
                                    <CheckBox
                                        name="radioObj"
                                        type="radio"
                                        items={[{name: 'obj_1'}, {name: 'obj_2'}]}
                                        visibleItem="name"
                                    />
                                </TagCommon>
                            </TagCommon>
                            <TagCommon height="100px" fd="row" ai="center" gap={SPACES.l}>
                                <Inputs.Switch name="input-switch" label="Switch"/>
                                <Switch name="switch" label="Switch"/>
                            </TagCommon>
                        </TagCommon>

                        INPUT CARD
                        <TagCommon fd="row" gap={SPACES.l} margin="0 0 2rem 0">
                            <Inputs
                                width="15rem"
                                name="card"
                                label="Card"
                                placeholder="0000 0000 0000 0000"
                                optionOnChange={(name, value, setFieldValue) => {
                                    const _value = changeCard('card', value);
                                    setFieldValue(name, _value);
                                }}
                            />

                            <Inputs
                                width="7rem"
                                name="expiry_data"
                                label="Date"
                                placeholder="MM/YY"
                                optionOnChange={(name, value, setFieldValue) => {
                                    const _value = changeCard('date', value);
                                    setFieldValue(name, _value);
                                }}
                            />

                            <Inputs
                                width="7rem"
                                name="cvv"
                                type="password"
                                label="CVV"
                                placeholder=""
                                optionOnChange={(name, value, setFieldValue) => {
                                    const _value = changeCard('cvc', value);
                                    setFieldValue(name, _value);
                                }}
                            />
                        </TagCommon>
                        INPUT STATE (default, readOnly, email, password)
                        <TagCommon fd="row" ai='flex-end' gap={SPACES.l} margin="0 0 2rem 0">
                            <OTP name='otp'  valueLength={4} />

                            <Input name="first_name" label="First Name" isSpellCheck/>
                            <Input
                                name="last_name"
                                label=" Name"
                                readOnly
                                width="400px"
                                startIcon={{icon: testIcon, height: '1.5rem'}}
                                endIcon={{icon: testIcon, height: '1.5rem', type: 'img'}}
                            />
                            <Input
                                name="email"
                                label={{
                                    text: 'Email',
                                    required: true
                                }}
                                startIcon={{icon: testIcon, height: '1.5rem'}}
                                endIcon={{icon: testIcon, height: '1.5rem', type: 'img'}}
                            />
                            <Input name="password" label="Password" type="password"/>
                        </TagCommon>
                        INPUTMATCHEDWORDS
                        <Styled.Sctol fd="row" gap={SPACES.l} ai="flex-end" margin="0 0 2rem 0">
                            <Inputs.MatchedWords
                                width="400px"
                                name="matched-words"
                                label="Default"
                                items={['test', 'test2', 'test3', 'test4']}
                            />

                            <MatchedWords
                                name="test"
                                width="400px"
                                label="Default"
                                items={['test', 'test2', 'test3', 'test4']}
                                readOnly
                            />

                            <MatchedWords
                                width="400px"
                                name="country"
                                label="Countri (Type-filter) (Input - default)"
                                items={data?.countries ?? []}
                                {...(getIn(values, 'country')?.icon
                                    ? {
                                        startIcon: {
                                            icon: getIn(values, 'country').icon,
                                            type: 'img'
                                        }
                                    }
                                    : null)}
                                visibleItem="name"
                                parseValue={(value, valueObj) => {
                                    return (
                                        <TagCommon fd="row" gap={SPACES.l}>
                                            <Icon icon={valueObj.icon} type="img"/>
                                            {value}
                                        </TagCommon>
                                    );
                                }}
                                filterOption={{
                                    mode: 'default',
                                    includes: 'startsWith',
                                    type: 'filter',
                                    isSavePreviousSelection: false
                                }}
                            />
                            <MatchedWords
                                width="400px"
                                name="country_multi"
                                label="Countri (Type-sort - Input -new )  (Multi Select) (Dynamic items)"
                                items={data?.countries ?? []}
                                visibleItem="name"
                                parseValue={(value, valueObj) => {
                                    return (
                                        <TagCommon fd="row" gap={SPACES.l}>
                                            {valueObj.icon && <Icon height="1rem" icon={valueObj.icon} type="img"/>}
                                            {value}
                                        </TagCommon>
                                    );
                                }}
                                filterOption={{
                                    mode: 'new',
                                    position: 'sticky',
                                    includes: 'includes',
                                    type: 'sort'
                                }}
                                type={{
                                    mode: 'multi',
                                    parseValue: (value, valueObj) => {
                                        return (
                                            <TagCommon fd="row" ai="center" gap={SPACES.l}>
                                                {valueObj.icon && <Icon height="1rem" icon={valueObj.icon} type="img"/>}
                                                {value}
                                            </TagCommon>
                                        );
                                    },
                                    addNewItem: true
                                }}
                            />
                        </Styled.Sctol>

                        DROPDOWN
                        <TagCommon fd='row' ai='center' gap='2rem' margin='0 0 2rem 0'>
                            <DropDown
                                isClick
                                visibleBlock={({focused, onSetIsFocused}) => {
                                    return (
                                        <Input
                                            name='phone'
                                            label='Phone'
                                            {...(getIn(values, 'phone')?.icon
                                                ? {
                                                    startIcon: {
                                                        icon: getIn(values, 'phone').icon,
                                                        type: 'img'
                                                    }
                                                }
                                                : null)}
                                            endIcon={{
                                                icon: arrowBottomIcon,
                                                className: focused ? 'rotate' : '',
                                                cursor: 'pointer',
                                                onClick: () => {
                                                    onSetIsFocused(!focused);
                                                }
                                            }}
                                            noFormikValue={{
                                                value: getIn(values, 'phone')?.phone ?? '',
                                                setFieldValue: (_, value) => {
                                                    setFieldValue('phone', {
                                                        icon: getIn(values, 'phone')?.icon ?? '',
                                                        phone: value
                                                    });
                                                }
                                            }}
                                        />
                                    );
                                }}
                                popupBlock={({onSetIsFocused, ItemTag}) => {
                                    return (data?.countries ?? [])
                                        .filter((v) => {
                                            const cleanInputPhone = (getIn(values, 'phone')?.phone || '').replace(
                                                /[\s+()]/g,
                                                ''
                                            );
                                            const cleanCountryPhone = v.phone.replace(/[\s+()]/g, '');
                                            const phonePrefix = cleanInputPhone.slice(0, cleanCountryPhone.length);
                                            return cleanCountryPhone.startsWith(phonePrefix);
                                        })
                                        .map((country: any, i: any) => (
                                            <ItemTag
                                                key={i}
                                                onClick={() => {
                                                    setFieldValue('phone', {icon: country.icon, phone: country.phone});
                                                    onSetIsFocused(false);
                                                }}
                                            >
                                                {country.icon && <Icon height='1rem' icon={country.icon} type='img'/>}
                                                {country.name} {country.phone}
                                            </ItemTag>
                                        ));
                                }}
                            />

                            {[
                                {
                                    position: 'left',
                                    hover: true,
                                    width: '70%',
                                    title: 'Hover & Click - Left'
                                },
                                {
                                    position: 'right',
                                    hover: true,
                                    width: '70%',
                                    title: 'Hover & Click - Right'
                                },
                                {
                                    hover: true,
                                    title: 'Hover & Click - 100%'
                                }
                            ].map((item, index) => (
                                <DropDown
                                    key={index}
                                    position={(item?.position as 'left' | 'right') ?? 'right'}
                                    isHover={item?.hover}
                                    isClick
                                    width={item?.width}
                                    visibleBlock={({focused}) => {
                                        return (
                                            <div
                                                style={{
                                                    userSelect: 'none',
                                                    width: 'fit-content',
                                                    height: '2.5rem',
                                                    padding: '0 1rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    border: `1px solid transparent`,
                                                    borderColor: focused ? `${theme.COLORS.primary}` : 'transparent'
                                                }}
                                            >
                                                {item.title}
                                            </div>
                                        );
                                    }}
                                    popupBlock={({onSetIsFocused, ItemTag}) => {
                                        return [1, 2, 3, 4, 5].map((itemPopup, i) => (
                                            <ItemTag key={i} onClick={onSetIsFocused.bind(this, false)}>
                                                {' '}
                                                item {itemPopup}
                                            </ItemTag>
                                        ));
                                    }}
                                />
                            ))}
                        </TagCommon>


                        CALENDAR
                        <TagCommon fd="row" gap={SPACES.l} ai="flex-end" margin="0 0 2rem 0">
                            <Inputs.Calendar
                                label="Calendar (Date)"
                                name="calendar_single"
                                mode="single"
                                visibleOfMonths={1}
                            />
                            <Calendar
                                width="400px"
                                label="Calendar (Date) "
                                name="calendar_single1"
                                mode="single"
                                visibleOfMonths={1}
                                readOnly
                            />
                            <Calendar
                                label="Calendar ({ftom:Date, to:Date }) "
                                name="calendar_range"
                                mode="range"
                                disabledDay={new Date()}
                            />
                            <Calendar
                                label="Calendar (Date[])"
                                name="calendar_multiple"
                                mode="multiple"
                            />
                        </TagCommon>

                        TEXTAREA
                        <TagCommon gap={SPACES.l} ai="flex-end" margin="0 0 2rem 0">
                            <Inputs.TextArea
                                name="text_area"
                                rows={3}
                                label="TextArea"
                                resizable={false}
                                maxLength={300}
                            />
                        </TagCommon>

                        <TextArea
                            name="resizable"
                            rows={2}
                            label="TextArea resizable"
                            resizable
                        />


                        DRAWER
                        <TagCommon fd="row" gap="2rem" margin="0 0 2rem 0">
                            <Button content="left" variant="primary" onClick={onToggle.bind(this, 'left', 'left')}/>
                            <Button content="right" variant="primary" onClick={onToggle.bind(this, 'right', 'right')}/>
                            <Button content="top" variant="primary" onClick={onToggle.bind(this, 'top', 'left')}/>
                            <Button content="bottom" variant="primary"
                                    onClick={onToggle.bind(this, 'bottom', 'right')}/>

                        </TagCommon>

                        POPUP FULLSCREEN
                        <TagCommon fd="row" gap="2rem" margin="0 0 2rem 0">
                            <Button content="top" variant="primary"
                                    onClick={onTogglePopup.bind(this, 'top', 'center')}/>
                            <Button content="bottom" variant="primary"
                                    onClick={onTogglePopup.bind(this, 'bottom', 'center')}/>
                            <Button content="left" variant="primary"
                                    onClick={onTogglePopup.bind(this, 'left', 'center')}/>
                            <Button content="right" variant="primary"
                                    onClick={onTogglePopup.bind(this, 'right', 'center')}/>
                            <Button content="center" variant="primary"
                                    onClick={onTogglePopup.bind(this, 'center', 'center')}/>
                        </TagCommon>

                        POPUP MOBILE
                        <TagCommon fd="row" gap="2rem" margin="0 0 2rem 0">
                            <Button content="top" variant="primary"
                                    onClick={onTogglePopup.bind(this, 'top', 'top')}/>
                            <Button content="bottom" variant="primary"
                                    onClick={onTogglePopup.bind(this, 'bottom', 'bottom')}/>
                        </TagCommon>


                        <File
                            name="file"
                            width="300px"
                        />

                    </Form>
                )}
            </Formik>


            <DrawerLayout title={'Test'}
                          open={openDrawer}
                          slidePosition={slidePositionDrawer}
                          contentPosition={contentPositionDrawer}
                          onClose={onToggle.bind(this, null, null)}
            >
                <TagCommon margin="3rem 0">
                    POPUP BUTTON
                    <TagCommon gap="3rem" margin="0 0 3rem 0">
                        <Button content="top" variant="primary"
                                onClick={onTogglePopup.bind(this, 'top', 'center')}/>
                        <Button content="bottom" variant="primary"
                                onClick={onTogglePopup.bind(this, 'bottom', 'center')}/>
                        <Button content="left" variant="primary"
                                onClick={onTogglePopup.bind(this, 'left', 'center')}/>
                        <Button content="right" variant="primary"
                                onClick={onTogglePopup.bind(this, 'right', 'center')}/>
                        <Button content="center" variant="primary"
                                onClick={onTogglePopup.bind(this, 'center', 'center')}/>
                    </TagCommon>
                </TagCommon>

            </DrawerLayout>

            <PopupLayout
                open={openPopup}
                onClose={onTogglePopup.bind(this, null, null)}
                slidePosition={slidePosition}
                contentPosition={contentPosition}
            >
                sdsdsdds
            </PopupLayout>


            ACCORDEON
            <TagCommon fd='row' gap={SPACES.xxxxxxl_}>
                <Accordion
                    visibleBlock="synchronized 1"
                    name="synchronized"
                >
                    d,cdlcldcdmckdcmkdcmkcdmkcdkcdk
                </Accordion>

                <Accordion
                    name="synchronized"
                    visibleBlock="synchronized 2"
                >
                    d,cdlcldcdmckdcmkdcmkcdmkcdkcdk
                </Accordion>

                <Accordion
                    name="test2"
                    visibleBlock="dmcdcmkm"
                >
                    d,cdlcldcdmckdcmkdcmkcdmkcdkcdk
                </Accordion>
            </TagCommon>


            DRAGANDDROP
            <DragAndDrop
                type="columns"
                props={{
                    ...dragAndDropColumn,
                    columnBinding: 'id',
                    rowBinding: 'id',
                    rowToColumnBinding: 'column_id',
                    title: 'title',
                    setState: setDragAndDropColumn
                }}
            />
            <DragAndDrop
                type="rows"
                props={{
                    ...dragAndDropRows,
                    rowBinding: 'id',
                    title: 'title',
                    setState: setDragAndDropRows
                }}
            />


            <TagCommon fd='row' gap='1rem' ai='baseline'>
                <TagCommon>
                    <TextCommon as='h1' size='xl'>
                        H1 size xl
                    </TextCommon>
                    <TextCommon as='h2' size='l'>
                        H2 size l
                    </TextCommon>
                    <TextCommon as='h3' size='m'>
                        H3 size m
                    </TextCommon>
                    <TextCommon as='h4' size='s'>
                        Hh size s
                    </TextCommon>
                    <TextCommon as='h5' size='xs'>
                        H5 size xs
                    </TextCommon>
                </TagCommon>
                <TagCommon>
                    <TextCommon as='p' size='xl'>
                        P size xl
                    </TextCommon>
                    <TextCommon as='p' size='l'>
                        P size l
                    </TextCommon>
                    <TextCommon as='p' size='m'>
                        P size m
                    </TextCommon>
                    <TextCommon as='p' size='s'>
                        P size s
                    </TextCommon>
                    <TextCommon as='p' size='xs'>
                        P size xs
                    </TextCommon>
                </TagCommon>
                <TagCommon>
                    <TextCommon as='span' size='xl'>
                        SPAN size xl
                    </TextCommon>
                    <TextCommon as='span' size='l'>
                        SPAN size l
                    </TextCommon>
                    <TextCommon as='span' size='m'>
                        SPAN size m
                    </TextCommon>
                    <TextCommon as='span' size='s'>
                        SPAN size s
                    </TextCommon>
                    <TextCommon as='span' size='xs'>
                        SPAN size xs
                    </TextCommon>
                </TagCommon>
            </TagCommon>
            <TagCommon fd='row' gap={SPACES.l} margin='3rem 0'>
                <Button
                    content='toast loading'
                    onClick={() => {
                        const _toast = toast.loading({title: 'Please wait...'});

                        setTimeout(() => {
                            _toast.success({
                                title: 'Success!',
                                text: 'Data loaded successfully.'
                            });
                        }, 1000);
                    }}
                />

                <Button
                    content='toast success'
                    onClick={() =>
                        toast.success({title: 'sdssddsdsddssdsdds', text: 'text text text text'})
                    }
                />
                <Button
                    content='toast info'
                    onClick={() => toast.info({title: 'sdssddsdsddssdsdds', text: 'text text text text'})}
                />
                <Button
                    content='toast error'
                    onClick={() => toast.error({title: 'sdssddsdsddssdsdds', text: 'text text text text'})}
                />

                <Button
                    content='toast warn'
                    onClick={() => toast.warn({title: 'sdssddsdsddssdsdds', text: 'text text text text'})}
                />
            </TagCommon>



            <Styled.Net>
                {[1,2,3,4].map((v)=> <TagCommon key={v} className='item' background='red' >{v}</TagCommon> )}
            </Styled.Net>

            <Styled.Net2>
                {[1,2,3,4].map((v)=> <TagCommon key={v} className='item' background='red' >{v}</TagCommon> )}
            </Styled.Net2>



            <Styled.NetGrid>
                {[1,2,3,4].map((v)=> <TagCommon key={v} className='item' background='red' >{v}</TagCommon> )}
            </Styled.NetGrid>

            <Styled.NetGrid2>
                {[1,2,3,4].map((v)=> <TagCommon key={v} className='item' background='red' >{v}</TagCommon> )}
            </Styled.NetGrid2>

        </Styled.Container>
    );
};
