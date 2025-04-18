import { Link } from 'react-router-dom';
import styled, { RuleSet, css } from 'styled-components';

import { Fonts, Margin } from '@/module/common/styles';
import { IButtonProps, TNavLink } from '@/module/common/types';
import { FONTS, MEDIA, SPACES, TRANSITIONS } from '@/theme';

const style = css<IButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: ${({ width }) => width ?? '100%'};
  height: ${({ height }) => height ?? '2.5rem'}!important;

  padding: ${({ pads }) => pads ?? `0 ${SPACES.xxxxl}`};

  ${Fonts};
  ${Margin};

  font-size: ${FONTS.SIZES.l};
  line-height: ${FONTS.SIZES.xxxxl};
  color: ${({ theme }) => theme.COLORS.white};
  color: ${({ theme }) => theme.COLORS.white};

  border-radius: 0.5rem;

  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.05);
  background-color: transparent;
  text-transform: capitalize;
  transition: all ${TRANSITIONS.duration.fast} ${TRANSITIONS.function.linear};

  @media screen and (max-width: ${MEDIA.mobile_m}) {
    font-size: ${FONTS.SIZES.xxsm};
    line-height: ${FONTS.SIZES.xxxxl};
  }

  @media screen and (max-width: ${MEDIA.mobile_l}) {
    font-size: ${FONTS.SIZES.s};
    line-height: ${FONTS.SIZES.xxxxl};
  }
`;

const defaultStyledButton = css`
  cursor: pointer;

  & > *:not(:disabled) {
    cursor: pointer !important;
  }

  &:active {
    opacity: 0.7;
  }

  &:disabled {
    opacity: 0.5;
    cursor: initial !important;

    & > * {
      cursor: initial !important;
    }

    &:hover {
      pointer-events: none;
    }
  }

  @media (hover: hover) {
    &:focus,
    &:hover {
      filter: saturate(150%);
    }
  }

  @media (hover: none) {
    &:focus {
      outline: none;
      filter: none;
    }

    &:hover {
      filter: none;
    }
  }
`;

const buttonAppearances: Record<Required<IButtonProps>['variant'], RuleSet<object>> = {
  primary: css`
    ${defaultStyledButton};

    background-color: ${({ theme }) => theme.COLORS.primary};
    border: 1px solid ${({ theme }) => theme.COLORS.primary};
    color: ${({ theme }) => theme.COLORS.white};

    & > .start,
    & > .end {
      background-color: ${({ theme }) => theme.COLORS.white};
    }
  `
};

export const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop)
})<IButtonProps>`
  //all: unset;

  & > #Loader {
    height: 100% !important;
  }

  ${style};
  ${({ variant }) => buttonAppearances[variant ?? 'primary']};
`;

export const NavLink = styled(Link)<TNavLink>`
  & > #Loader {
    height: 100% !important;
  }

  text-decoration: none;
  color: inherit;
  ${style};
  ${({ variant }) => buttonAppearances[variant ?? 'primary']};

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      cursor: initial;
    `}
`;
