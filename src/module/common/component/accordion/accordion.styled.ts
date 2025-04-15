import styled from 'styled-components';

import { IMargin } from '@/module/common/types';

import { Fonts, Margin } from '../../styles';

export interface IWProps extends IMargin {
  width?: string;
}

export const Details = styled.details<IWProps>`
  position: relative;
  width: ${({ width }) => width ?? '100%'};

  & > * {
    ${Fonts};
  }

  .rotate {
    transform: rotate(180deg) !important;
  }

  & > summary::-webkit-details-marker {
    display: none;
  }

  ${Margin};
`;

export const Summary = styled.summary`
  list-style: none;
  display: flex;
  justify-content: space-between;

  overflow: auto;
  ${Fonts};

  cursor: pointer;
`;
