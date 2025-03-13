import styled from 'styled-components';

import { commonStyles } from '@/module/common/component/inputs/input/input.styled.ts';
import { Margin } from '@/module/common/styles';
import { IMargin } from '@/module/common/types';
import { SPACES } from '@/theme';

interface IOtpContainer extends IMargin {
  width?: string;
  height?: string;
}

export const OtpContainer = styled.div<IOtpContainer>`
  display: flex;
  column-gap: 10px;

  max-width: 220px;
  width: ${({ width }) => width ?? '100%'};
  height: ${({ height }) => height ?? '56px'};

  ${Margin};
`;

export const OtpInput = styled.input`
  width: 100%;
  height: 100%;

  ${commonStyles};
  padding: ${SPACES.s} ${SPACES.xl};
`;
