import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

import { Fonts, Margin } from '@/module/common/styles';
import { IMargin } from '@/module/common/types';
import { FONTS, INDEX, SPACES } from '@/theme';

export interface IWProps extends IMargin {
  readOnly?: boolean;
  width?: string;
  $focused: boolean;
}

export const Wrapper = styled(motion.div)<IWProps>`
  position: relative;
  // width: ${({ width }) => width ?? '100%'};
  opacity: ${({ readOnly }) => (readOnly ? '0.4' : '1')};
  cursor: pointer;
  ${Margin};

  user-select: none;

  & > * {
    user-select: none;
  }

  ${({ $focused }) =>
    $focused
      ? css`
          #DropDownChildren {
            display: block;
          }
        `
      : css`
          #DropDownChildren {
            display: none;
          }
        `};
`;

export const ItemContainer = styled(motion.ul).withConfig({
  shouldForwardProp: (prop) => !['position'].includes(prop)
})<{
  position?: 'left' | 'right';
  width?: string;
}>`
  display: none;
  transform-origin: top;
  background-color: ${({ theme }) => theme.COLORS.white};
  box-shadow: 0 2px 8px ${({ theme }) => theme.rgba(theme.COLORS.black, 0.1)};
  border-radius: ${SPACES.xxsm};
  width: ${({ width }) => (width ? width : '100%')} !important;
  max-height: 14rem;
  position: absolute;
  z-index: ${INDEX.absolute};
  overflow-y: auto !important;
  overflow-x: hidden;

  ${({ position }) => (position === 'left' ? 'left: 0;' : 'right: 0;')};
`;

export const Item = styled(motion.li)<{
  $selected: boolean;
}>`
  padding: ${SPACES.xs} ${SPACES.m};
  background: ${({ $selected, theme }) => ($selected ? theme.COLORS.primary : theme.COLORS.white)};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  ${Fonts};
  font-weight: ${FONTS.WEIGHTS.medium};
  cursor: pointer;

  &:hover {
    background: ${({ $selected, theme }) =>
      $selected ? theme.rgba(theme.COLORS.primary, 0.9) : theme.rgba(theme.COLORS.primary, 0.6)};
  }
`;
