import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { Margin } from '@/module/common/styles/margin.styled';
import { IFonts, IMargin } from '@/module/common/types';
import { FONTS } from '@/theme';

export const Fonts = css<IFonts>`
  font-family: ${({ ff }) => ff ?? FONTS.FAMILIES.roboto};
  font-weight: ${({ fw }) => (fw ? `${fw} !important` : FONTS.WEIGHTS.normal)};
  font-size: ${({ fs }) => (fs ? `${fs} !important` : FONTS.SIZES.m)};
  line-height: ${({ lh }) => (lh ? `${lh} !important` : FONTS.SIZES.xxl)};
  color: ${({ color, theme }) => color ?? theme.COLORS.black};
  cursor: ${({ cursor }) => cursor ?? 'text'};

  text-align: ${({ ta }) => ta ?? 'left'};
  ${({ ws }) => ws && `white-space: ${ws};`};

  ${({ lineClamp }) =>
    lineClamp &&
    css`
      display: -webkit-box;
      -webkit-line-clamp: ${lineClamp};
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    `};

  ${({ width }) =>
    width &&
    css<{ width?: string }>`
      width: ${({ width }) => width};
    `}
`;

export const textSizes = {
  xs: css`
    font-size: 1rem;
    font-weight: ${FONTS.WEIGHTS.medium};
    line-height: 1.2;
  `,
  s: css`
    font-size: 1.125rem;
    font-weight: ${FONTS.WEIGHTS.medium};
    line-height: 1.2;
  `,
  m: css`
    font-size: 1.25rem;
    font-weight: ${FONTS.WEIGHTS.semi_bold};
    line-height: 1.2;
  `,
  l: css`
    font-size: 1.5rem;
    font-weight: ${FONTS.WEIGHTS.bold};
    line-height: 1.2;
  `,
  xl: css`
    font-size: 2rem;
    font-weight: ${FONTS.WEIGHTS.bold};
    line-height: 1.2;
  `
};
const headingSizes = {
  xs: css`
    font-size: 2.5rem;
    font-weight: ${FONTS.WEIGHTS.bold};
    line-height: 1.3;
  `,
  s: css`
    font-size: 3rem;
    font-weight: ${FONTS.WEIGHTS.bold};
    line-height: 1.3;
  `,
  m: css`
    font-size: 3rem;
    font-weight: ${FONTS.WEIGHTS.bold};
    line-height: 1.3;
  `,
  l: css`
    font-size: 4.5rem;
    font-weight: ${FONTS.WEIGHTS.bold};
    line-height: 1.3;
  `,
  xl: css`
    font-size: 5rem;
    font-weight: ${FONTS.WEIGHTS.bold};
    line-height: 1.3;
  `
};

type TSizes = 'xs' | 's' | 'm' | 'l' | 'xl';
type THeading = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
type TTag = 'span';

export const TextCommon = styled.p.withConfig({
  shouldForwardProp: (prop) =>
    !['ml', 'mr', 'mb', 'mt', 'size', 'maxWidth', 'lineClamp'].includes(prop)
})<
  IFonts &
    IMargin & {
      size?: TSizes;
      as?: THeading | TTag;
      width?: string;
      maxWidth?: string;
    }
>`
  ${Fonts};

  & > * {
    ${Fonts};
  }

  & > strong {
    font-weight: ${FONTS.WEIGHTS.medium};
  }

  ${Margin};

  ${({ width }) => width && `width: ${width};`};
  ${({ maxWidth }) => maxWidth && `max-width: ${maxWidth} !important;`};

  ${({ size, as }) => {
    if (!size) return null;

    if (as && as.includes('h')) {
      return headingSizes[size];
    }

    return textSizes[size];
  }};
`;

export const LinkCommon = styled(Link).withConfig({
  shouldForwardProp: (prop) => !['ml', 'mr', 'mb', 'mt', 'size'].includes(prop)
})<IFonts & IMargin & { size: TSizes }>`
  ${Fonts};
  color: ${({ theme }) => theme.COLORS.primary};

  & > * {
    ${Fonts};
    color: ${({ theme }) => theme.COLORS.primary};
  }

  cursor: pointer;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  ${Margin};

  ${({ size }) => {
    if (!size) return null;
    return textSizes[size];
  }};
`;
