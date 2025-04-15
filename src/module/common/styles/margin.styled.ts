import { css } from 'styled-components';

import { IBorder, IMargin, IPadding } from '@/module/common/types';

export const Margin = css<IMargin>`
  ${({ mr }) => mr && `margin-right: ${mr};`};
  ${({ mt }) => mt && `margin-top: ${mt};`};
  ${({ mb }) => mb && `margin-bottom: ${mb};`};
  ${({ ml }) => ml && `margin-left: ${ml};`};
  ${({ margin }) => margin && `margin: ${margin};`};
`;

export const Border = css<IBorder>`
  ${({ br }) => br && `border-left: ${br};`};
  ${({ bt }) => bt && `border-top: ${bt};`};
  ${({ bb }) => bb && `border-bottom: ${bb};`};
  ${({ bl }) => bl && `border-left: ${bl};`};
  ${({ border }) => border && `border: ${border};`}
  ${({ borderRadius }) => borderRadius && `border-radius: ${borderRadius};`}
`;

export const Padding = css<IPadding>`
  ${({ pr }) => pr && `padding-right: ${pr};`};
  ${({ pt }) => pt && `padding-top: ${pt};`};
  ${({ pb }) => pb && `padding-bottom: ${pb};`};
  ${({ pl }) => pl && `padding-left: ${pl};`};
  ${({ padding }) => padding && `padding: ${padding};`};
`;
