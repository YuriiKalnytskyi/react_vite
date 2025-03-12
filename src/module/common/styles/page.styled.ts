import styled, {css} from 'styled-components';

import {Border, Margin, Padding} from '@/module/common/styles/margin.styled.ts';
import {IIcon, ITagCommon} from '@/module/common/types';
import {Scroll} from "@/module/common/styles/scroll.ts";

export const Center = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;


export const TagCommon = styled.section.withConfig({
    shouldForwardProp: (prop) => !['fd', 'jc', 'ai', 'maxWidth', 'borderRadius'].includes(prop)
})<ITagCommon>`
    width: ${({width}) => width ?? '100%'};
    height: ${({height}) => height ?? 'fit-content'};

    ${({maxWidth}) => maxWidth && `max-width: ${maxWidth};`};

    ${({gap}) => gap && `gap: ${gap};`};

    display: flex;
    flex-direction: ${({fd}) => fd ?? 'column'};
    ${({ai}) => ai && `align-items: ${ai};`};
    ${({jc}) => jc && `justify-content: ${jc};`};
    ${({fw}) => fw && `flex-wrap: ${fw};`};

    position: relative;

    ${({background}) => background && `background: ${background};`}

     ${Border};
    ${Margin};
    ${Padding};
    ${Scroll};

    .full {
        flex: 1;
    }
`;
export const IconCommon = styled.div.withConfig({
    shouldForwardProp: (prop) => !['mt', 'mb', 'ml', 'mr'].includes(prop),
})<IIcon>`
    height: ${({height}) => height ?? '1.25rem'};

    ${({width}) =>
            width
                    ? css`
                        width: ${width ?? '1.25rem'};
                    `
                    : css`
                        aspect-ratio: 1/1;
                    `}

    background: ${({background, theme}) => background ?? theme.COLORS.black};

    -webkit-mask-image: url(${({icon}) => icon});
    -webkit-mask-size: 100% 100%;
    mask-image: url(${({icon}) => icon});
    cursor: ${({cursor}) => cursor ?? 'text'};

    ${Margin};
`;
