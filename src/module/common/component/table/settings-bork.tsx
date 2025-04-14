import {AnimatePresence, motion} from "framer-motion";
import styled, {useTheme} from "styled-components";
import {ReactNode, useState} from "react";
import arrowsDownUpIcon from '@/assets/icons/default/arrows-down-up.svg';
import {CheckBox, Icon} from "@/module/common/component";
import {Center, TagCommon, TextCommon} from "@/module/common/styles";
import {useClickOutside} from "@/module/common/hooks";
import {ArrayHeader} from "./table.type.ts";
import {SPACES} from "@/theme";
import {useTranslation} from "react-i18next";

interface IComponent {
    text: string;
    component: string;
}

export const SettingsBork = ({columns}: {
    columns: {
        columns: ArrayHeader[]
        default: ArrayHeader[]
        setColumns: (columns: ArrayHeader[]) => void
    }
}) => {
    const theme = useTheme();
    const {t} = useTranslation('translation', {keyPrefix: 'common'});

    const [isOpen, setIsOpen] = useState(false);
    const [component, setComponent] = useState<IComponent | null>(null);

    const onSetComponent = (opt: IComponent | null) => {
        setComponent(opt);
    };

    const {ref} = useClickOutside(() => {
        if (isOpen) {
            setIsOpen(false);
            setComponent(null)
        }
    })

    const settingsOptions = [
        {text: t('columns'), component: 'columns'},
    ];


    const Components: { [key: string]: ReactNode } = {
        "columns": (
            <TagCommon gap={SPACES.xxs}>
                {
                    columns.default.map((v) => (
                        <CheckBox
                            key={v.data_key}
                            name={v.data_key}
                            type='default'
                            items={v.text}
                            noFormikValue={{
                                value: !!columns.columns.find((item => item.text === v.text)),
                                onSetValue: () => {
                                    if (!!columns.columns.find((item => item.text === v.text))) {
                                        columns.setColumns(columns.columns.filter((item) => item.text !== v.text));
                                    } else {
                                        columns.setColumns([...columns.columns, v]);
                                    }
                                }
                            }}
                        />
                    ))
                }

                <TagCommon fd='row' jc='space-between'>
                    <TextCommon
                        width='fit-content'
                        onClick={() => columns.setColumns([])}
                    >
                        {t('hide')}
                    </TextCommon>
                    <TextCommon
                        width='fit-content'
                        onClick={() => columns.setColumns(columns.default)}
                    >
                        {t('show')}
                    </TextCommon>
                </TagCommon>

            </TagCommon>
        )
    }


    return (
        <Setting ref={ref as any} onClick={() => setIsOpen(true)}>
            <Icon
                icon={arrowsDownUpIcon}
                height="0.7rem"
                background={theme.COLORS.black}
                cursor="pointer"
            />

            <AnimatePresence>
                {isOpen && (
                    <StyledWrapper
                        initial={{opacity: 0, scale: 0.9}}
                        animate={{opacity: 1, scale: 1}}
                        exit={{opacity: 0, scale: 0.9}}
                        transition={{duration: 0.2}}
                    >
                        <AnimatePresence mode="wait">
                            {!component && (
                                <motion.div
                                    key="root"
                                    initial={{x: 30, opacity: 0}}
                                    animate={{x: 0, opacity: 1}}
                                    exit={{x: -30, opacity: 0}}
                                    transition={{duration: 0.2}}
                                >
                                    {settingsOptions.map((v) => (
                                        <div
                                            key={v.text}
                                            className="option"
                                            onClick={onSetComponent.bind(this, v)}
                                        >
                                            {v.text}
                                        </div>
                                    ))}
                                </motion.div>
                            )}

                            {!!component && (
                                <motion.div
                                    key="option"
                                    initial={{x: 30, opacity: 0}}
                                    animate={{x: 0, opacity: 1}}
                                    exit={{x: -30, opacity: 0}}
                                    transition={{duration: 0.2}}
                                >
                                    <div className="back" onClick={onSetComponent.bind(this, null)}>← {t('back')}</div>
                                    <div className="title">{component.text}</div>
                                    {Components[component.component]}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </StyledWrapper>
                )}
            </AnimatePresence>
        </Setting>
    );
};

export const Setting = styled.div`
    height: 1.5rem;
    aspect-ratio: 1/1;
    position: absolute;
    z-index: 2;
    left: -0.5rem;
    top: -0.5rem;
    background-color: ${({theme}) => theme.COLORS.primary};

    border-radius: 50%;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);

    ${Center};
`
const StyledWrapper = styled(motion.div)`
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, 0.5rem);
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
    padding: 0.8rem;
    min-width: 10rem;
    z-index: 10;
    font-size: 0.8rem;


    .back {
        cursor: pointer;
        color: ${({theme}) => theme.COLORS.primary};
        margin-bottom: 0.5rem;
        font-size: 0.75rem;
        transition: color 0.2s;

        &:hover {
            color: ${({theme}) => theme.rgba(theme.COLORS.black, 0.7)};
        }
    }

    .title {
        font-weight: bold;
        margin-bottom: 0.5rem;
    }


    .option {
        cursor: pointer;
        padding: 0.3rem;
        border-radius: 0.3rem;
        transition: background 0.2s;

        &:hover {
            background: #f3f3f3;
        }

        &.active {
            background: ${({theme}) => theme.COLORS.primary};
            color: white;
        }
    }


    .details {
        margin-top: 0.6rem;
        font-size: 0.75rem;
        color: #333;
    }
`;
