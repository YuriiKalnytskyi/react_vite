export type TTags =
  | 'div'
  | 'section'
  | 'header'
  | 'main'
  | 'footer'
  | 'nav'
  | 'aside'
  | 'article'
  | 'address'
  | 'time'
  | 'figure'
  | 'figcaption';

export interface ITagCommon extends IBorder, IMargin, IPadding, IScroll {
  width?: string;
  maxWidth?: string;
  minWidth?: string;
  height?: string;
  gap?: string;
  fd?: 'row' | 'row-reverse' | 'column-reverse' | 'column' | string;
  jc?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'baseline';
  ai?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'baseline';
  fw?: 'wrap';

  background?: string;

  as?: TTags;
}

export interface IIcon extends IMargin {
  icon: string;
  height?: string;
  width?: string;
  background?: string;
  cursor?: 'pointer' | 'text';
}

export interface IIconInput extends IIcon {
  onClick?: () => void;
  onMouseDown?: any;
  type?: 'svg' | 'img' | string;
  className?: string;
}

export interface IMargin {
  mr?: string;
  ml?: string;
  mb?: string;
  mt?: string;
  margin?: string;
}

export interface IBorder {
  br?: string;
  bl?: string;
  bb?: string;
  bt?: string;
  border?: string;
  borderRadius?: string;
}

export interface IPadding {
  pr?: string;
  pl?: string;
  pb?: string;
  pt?: string;
  padding?: string;
}

export interface IFonts {
  ff?: string;
  fw?: string;
  fs?: string;
  lh?: string;
  color?: string;
  cursor?: 'pointer' | 'text';
  ta?: 'left' | 'center' | 'right';
  ws?: 'nowrap';
  width?: string;
  lineClamp?: number;
}

export type OverflowType = 'auto' | 'scroll' | 'hidden';

export interface IScroll {
  oy?: OverflowType;
  ox?: OverflowType;

  scrollbar_display?: 'flex' | 'none';
  scrollbar_height?: string;
  scrollbar_width?: string;
  scrollbar_background?: string;
  scrollbar_thumb_background?: string;
}
