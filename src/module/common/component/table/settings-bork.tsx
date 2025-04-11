import { AnimatePresence, motion } from "framer-motion";
import styled, {useTheme} from "styled-components";
import {useState} from "react";
import arrowsDownUpIcon from '@/assets/icons/default/arrows-down-up.svg';
import {Icon} from "@/module/common/component";
import {Center} from "@/module/common/styles";

const settingsOptions = ['Колонки', 'Тема', 'Приватність'];


export const SettingsBork = () => {
    const theme = useTheme();
    const [showBork, setShowBork] = useState(false);
    const [level, setLevel] = useState<'root' | 'option'>('root');
    const [activeOption, setActiveOption] = useState<string | null>(null);

    const handleOptionClick = (opt: string) => {
        setActiveOption(opt);
        setLevel('option');
    };

    const goBack = () => {
        setLevel('root');
        setActiveOption(null);
    };

    return (
        <Setting onClick={() => setShowBork(true)}>
            <Icon
                icon={arrowsDownUpIcon}
                height="0.7rem"
                background={theme.COLORS.black}
                cursor="pointer"
            />

            <AnimatePresence>
                {showBork && (
                    <StyledWrapper
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Рівень 1: Головне меню */}
                        <AnimatePresence mode="wait">
                            {level === 'root' && (
                                <motion.div
                                    key="root"
                                    initial={{ x: 30, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -30, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="title">Налаштування</div>
                                    <div className="options">
                                        {settingsOptions.map((opt) => (
                                            <div
                                                key={opt}
                                                className="option"
                                                onClick={() => handleOptionClick(opt)}
                                            >
                                                {opt}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Рівень 2: Вибрана опція */}
                            {level === 'option' && activeOption && (
                                <motion.div
                                    key="option"
                                    initial={{ x: 30, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -30, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="back" onClick={goBack}>← Назад</div>
                                    <div className="title">{activeOption}</div>
                                    <div className="details">
                                        {activeOption === 'Звук' && <div>🔊 Виберіть рівень гучності</div>}
                                        {activeOption === 'Тема' && <div>🌙 Світла / Темна</div>}
                                        {activeOption === 'Приватність' && <div>🔒 Керування дозволами</div>}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </StyledWrapper>
                )}
            </AnimatePresence>
        </Setting>
    );
};

export const Setting  = styled.div`
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


    .bork {
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translate(-50%, 0.5rem);
        background-color: white;
        color: black;
        padding: 0.4rem 0.6rem;
        border-radius: 0.5rem;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
        white-space: nowrap;
        font-size: 0.75rem;
    }
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
        color: ${({ theme }) => theme.COLORS.primary};
        margin-bottom: 0.5rem;
        font-size: 0.75rem;
        transition: color 0.2s;

        &:hover {
            color: ${({ theme }) => theme.rgba(theme.COLORS.black, 0.7)};
        }
    }

    .title {
        font-weight: bold;
        margin-bottom: 0.5rem;
    }

    .options {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;

        .option {
            cursor: pointer;
            padding: 0.3rem;
            border-radius: 0.3rem;
            transition: background 0.2s;

            &:hover {
                background: #f3f3f3;
            }

            &.active {
                background: ${({ theme }) => theme.COLORS.primary};
                color: white;
            }
        }
    }

    .details {
        margin-top: 0.6rem;
        font-size: 0.75rem;
        color: #333;
    }
`;
