import styled, {css} from 'styled-components';


import {ILoaderProps} from '../../types';
import {Center} from "@/module/common/styles";

const small = css`
    height: 2rem;
    aspect-ratio: 1/1;
`;
const medium = css`
    height: 3rem;
    aspect-ratio: 1/1;
`;
const large = css`
    width: 5.25rem;
    height: 5.25rem;
`;

export const MyContainer = styled.div`
    width: 100%;
    height: 100vh;
    ${Center};
`;

export const Loader = styled.div<ILoaderProps>`
    display: inline-flex;
    align-items: center;
    justify-content: center;

    ${({ variant = 'ring', size, color, theme }) => {
        const loaderColor = color ?? theme.COLORS.primary;

        switch (variant) {
            case 'dots':
                return css`
                    gap: 0.5rem;
                    & span {
                        width: 0.8rem;
                        height: 0.8rem;
                        background-color: ${loaderColor};
                        border-radius: 50%;
                        display: inline-block;
                        animation: dots-bounce 0.6s infinite ease-in-out alternate;
                    }

                    & span:nth-child(2) {
                        animation-delay: 0.2s;
                    }

                    & span:nth-child(3) {
                        animation-delay: 0.4s;
                    }

                    @keyframes dots-bounce {
                        to {
                            transform: translateY(-50%);
                            opacity: 0.4;
                        }
                    }
                `;

            case 'bars':
                return css`
                    gap: 0.4rem;
                    align-items: flex-end;

                    & span {
                        width: 0.3rem;
                        height: 1rem;
                        background-color: ${loaderColor};
                        display: inline-block;
                        animation: bars-grow 0.8s infinite ease-in-out;
                    }

                    & span:nth-child(2) {
                        animation-delay: 0.2s;
                    }

                    & span:nth-child(3) {
                        animation-delay: 0.4s;
                    }

                    @keyframes bars-grow {
                        0%, 100% {
                            transform: scaleY(0.5);
                        }
                        50% {
                            transform: scaleY(1.2);
                        }
                    }
                `;

            case 'spinner':
                return css`
                    ${size === 'small' ? small : size === 'large' ? large : medium};

                    border: 0.3rem solid ${loaderColor};
                    border-top-color: transparent;
                    border-radius: 50%;
                    animation: spinner 0.8s linear infinite;

                    @keyframes spinner {
                        to {
                            transform: rotate(360deg);
                        }
                    }
                `;

            default: // 'ring'
                return css`
                    &:after {
                        content: '';
                        display: block;
                        ${size === 'small' ? small : size === 'large' ? large : medium};

                        border-radius: 50%;
                        border: 0.375rem solid ${loaderColor};
                        border-color: ${loaderColor} transparent;
                        animation: lds-dual-ring 1.2s linear infinite;
                    }

                    @keyframes lds-dual-ring {
                        0% {
                            transform: rotate(0deg);
                        }
                        100% {
                            transform: rotate(360deg);
                        }
                    }
                `;
        }
    }}
`;


// export const Loader = styled.div<ILoaderProps>`
//     &:after {
//         content: '';
//         display: block;
//         ${({size}) => {
//             switch (size) {
//                 case 'small':
//                     return small;
//                 case 'large':
//                     return large;
//                 default:
//                     return medium;
//             }
//         }}
//
//         border-radius: 50%;
//         border: ${({color, theme}) => `0.375rem solid  ${color ?? theme.COLORS.primary}`};
//         border-color: ${({color, theme}) => `${color ?? theme.COLORS.primary} transparent`};
//         animation: lds-dual-ring 1.2s linear infinite;
//     }
//
//     @keyframes lds-dual-ring {
//         0% {
//             transform: rotate(0deg);
//         }
//         100% {
//             transform: rotate(360deg);
//         }
//     }
// `;
