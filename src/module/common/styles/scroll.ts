import { css } from 'styled-components';

import { IScroll } from '@/module/common/types';

export const Scroll = css<IScroll>`
    ${({ oy }) => oy && ` overflow-y: ${oy};`};
    ${({ ox }) => ox && ` overflow-x: ${ox};`};

    &::-webkit-scrollbar {
        display: ${({ scrollbar_display }) => scrollbar_display ?? 'none'};
        height: ${({ scrollbar_height }) => scrollbar_height ?? 'none'};
        width: ${({ scrollbar_width }) => scrollbar_width ?? 'none'};
        background-color: ${({ scrollbar_background, theme }) =>
                scrollbar_background ?? theme.COLORS.black};
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${({ scrollbar_thumb_background }) =>
                scrollbar_thumb_background ?? 'transparent'};
    }

    &::-webkit-scrollbar-track {
        background-color: transparent;
    }
`;
