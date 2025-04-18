import styled from 'styled-components';

import { Fonts, Margin } from '@/module/common/styles';
import { IMargin } from '@/module/common/types';
import { INDEX, SPACES } from '@/theme';

export const CheckBoxWrapper = styled.div`
  position: relative;
  display: flex;
  gap: ${SPACES.l};
`;
export const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 3.25rem;
  height: 2rem;
  border-radius: 100px;
  background: ${({ theme }) => theme.COLORS.white};
  border: 2px solid ${({ theme }) => theme.COLORS.black};
  cursor: pointer !important;
  display: flex;
  align-items: center;
  transition: background 0.2s, border 0.2s;

  &::after {
    content: '';
    display: block;
    border-radius: 50%;
    height: 1.25rem;
    aspect-ratio: 1/1;
    margin: ${SPACES.xxs};
    background: ${({ theme }) => theme.COLORS.black};
    transition: background 0.2s;
  }
`;
export const CheckBox = styled.input`
  opacity: 0;
  z-index: ${INDEX.default};
  border-radius: 15px;
  width: 3.25rem;
  height: 2rem;
  cursor: pointer !important;
  &:checked + ${CheckBoxLabel} {
    background: ${({ theme }) => theme.COLORS.primary};
    border: 2px solid ${({ theme }) => theme.COLORS.primary};
    &::after {
      content: '';
      display: block;
      background: ${({ theme }) => theme.COLORS.white};
      border-radius: 50%;
      height: 1.25rem;
      aspect-ratio: 1/1;
      margin-left: 1.5rem;
      transition: background 0.2s;
      cursor: pointer !important;
    }
  }
`;

export const Label = styled.label<IMargin>`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: baseline;

  outline: none;

  ${Margin};
  ${Fonts};

  &:focus,
  &:focus-within,
  &:hover {
    & > .text::before {
      border: 2px solid ${({ theme }) => theme.COLORS.primary} !important;
    }
  }
`;
