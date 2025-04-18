import { ButtonHTMLAttributes, ReactNode } from 'react';
import { LinkProps } from 'react-router-dom';

import { IIcon, IMargin } from './styles.type';

export interface ICloseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  width?: string;
  height?: string;
}

export interface IButtonBasicProps extends IMargin {
  id?: string;
  content?: string | ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e?: any) => void;
  className?: string;
  width?: string;
  height?: string;
  children?: ReactNode;
}

export interface IIconButton {
  marginIcon?: string;
  widthIcon?: string;
}

export interface IStartIcon extends IIcon {
  onClick?: () => void;
  type?: 'svg' | 'img' | string;
}

export interface IButtonProps extends IButtonBasicProps {
  disabled?: boolean;
  variant?: 'primary';
  pads?: string;
  startIcon?: IStartIcon;
  endIcon?: IStartIcon;
  isLoading?: boolean | { color: string };
  background?: string;
}

export type TNavLink = LinkProps & IButtonProps;
