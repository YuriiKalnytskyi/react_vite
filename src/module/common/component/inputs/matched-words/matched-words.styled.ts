import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';

import { Center, Fonts } from '@/module/common/styles';
import { IMargin } from '@/module/common/types';
import { FONTS, SPACES } from '@/theme';

export interface IWProps extends IMargin {
  readOnly?: boolean;
  width?: string;
  $focused: boolean;
}
export const Wrapper = styled(motion.div)<IWProps>`
    position: relative;
    width: ${({ width }) => width ?? '100%'};
    cursor: pointer;
}

#addOrCloseIcon {
    height: 1rem;
    cursor: pointer;
    position: absolute;
    right: 0.5rem;
    top: 0.1rem;
    z-index: 10;
    transition: transform 0.35s ease-out;
    transform: rotate(45deg);
    
    &.active {
        transform: rotate(90deg) !important;
    }
}

${({ $focused }) =>
  $focused
    ? css`
        #SuggestedBlock {
          display: flex;
        }
      `
    : css`
        #SuggestedBlock {
          display: none;
        }
      `};
`;

export const SuggestedBlock = styled(motion.ul)<{ $position?: string }>`
  transform-origin: top;
  display: none;
  background: ${({ theme }) => theme.COLORS.white};
  border: 1px solid ${({ theme }) => theme.rgba(theme.COLORS.black, 0.4)};

  border-radius: 8px;
  width: 100%;
  min-width: 16rem;
  flex-direction: column;
  max-height: 14rem;
  box-shadow: 0 0 4px ${({ theme }) => theme.rgba(theme.COLORS.black, 0.8)};

  #search {
    width: 100%;
    ${Center};
    background: ${({ theme }) => theme.COLORS.white};
    padding: ${SPACES.l} 0;
    position: ${({ $position }) => $position ?? 'sticky'};
    top: 0;
    z-index: 1;
  }

  position: absolute;
  z-index: 1;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0.3rem;
  }

  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.rgba(theme.COLORS.primary, 0.2)};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.COLORS.primary};
    border-radius: 0.25rem;
  }
`;

export const HintOption = styled(motion.li)<{
  $selected: boolean;
  $isChip: boolean;
}>`
  padding: ${SPACES.xs} ${SPACES.m};
  background: ${({ $selected, $isChip, theme }) =>
    $selected || $isChip ? theme.COLORS.primary : theme.COLORS.white};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  ${Fonts};
  font-weight: ${FONTS.WEIGHTS.medium};
  cursor: pointer;

  overscroll-behavior: contain;

  &:hover {
    background: ${({ $selected, theme }) =>
      $selected ? theme.rgba(theme.COLORS.primary, 0.9) : theme.rgba(theme.COLORS.primary, 0.6)};
  }

  &.notFound {
    cursor: default;
    background: ${({ theme }) => theme.COLORS.white};
    ${Center};

    &:hover {
      background: ${({ theme }) => theme.COLORS.white};
    }
  }
`;

export const ChipContainer = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: ${SPACES.xs};
  flex-wrap: wrap;

  margin-top: ${SPACES.xxs};
  position: absolute;
`;

export const Chip = styled.li`
  width: fit-content;
  cursor: pointer;

  gap: ${SPACES.xs};

  ${Center};
  ${Fonts};
  font-weight: ${FONTS.WEIGHTS.semi_bold};

  padding: ${SPACES.xxs} ${SPACES.s};
  background: ${({ theme }) => theme.rgba(theme.COLORS.black, 0.3)};
  border-radius: 4px;

  word-break: break-word;
`;
