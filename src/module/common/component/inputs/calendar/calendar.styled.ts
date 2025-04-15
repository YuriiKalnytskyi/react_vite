import { DayPicker } from 'react-day-picker';
import styled, { css } from 'styled-components';

import { PopupLayout } from '@/module/common/layout';
import { IMargin } from '@/module/common/types';
import { FONTS, INDEX, MEDIA } from '@/theme';

const dayPicker = css`
  .rdp-multiple_months {
    margin-top: 0;
    border-color: ${({ theme }) => theme.COLORS.primary};
  }

  .endIcon {
    background: #989aa0;
  }

  .rdp-button_reset.rdp-button.rdp-day.rdp-day_selected.rdp-day_range_end.rdp-day_range_start {
    border-radius: 0;
  }

  .rdp-caption_label {
    color: #2c2c2c;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 20px;
    font-family: ${FONTS.FAMILIES.roboto};
  }

  .rdp-nav_icon {
    color: #98a2b3;
  }

  .rdp-nav_icon:hover {
    color: #4d5560;
  }

  .rdp-day_selected,
  .rdp-day_selected:focus-visible,
  .rdp-day_selected:hover {
    background-color: ${({ theme }) => theme.rgba(theme.COLORS.black, 0.2)};
    border-radius: 0;
    color: #2c2c2c;
  }

  .rdp-day {
    font-weight: 400;
    font-size: 0.875rem;
  }

  .rdp-day_today {
    font-weight: 500;
  }

  .rdp-day_today:not(.rdp-day_outside, .rdp-day_range_middle) {
    color: ${({ theme }) => theme.COLORS.white};
    background-color: ${({ theme }) => theme.COLORS.black};
    border-radius: 0.25rem;
  }

  .rdp-day_range_start,
  .rdp-day_range_end {
    color: ${({ theme }) => theme.COLORS.white};
    background-color: ${({ theme }) => theme.COLORS.primary};
  }

  .rdp-day_range_start {
    border-radius: 0.5rem 0.5rem 0.5rem;
  }

  .rdp-day_range_end {
    border-radius: 0.5rem 0.5rem 0.5rem;
  }

  .rdp-day:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  .rdp-button_reset.rdp-button.rdp-nav_button.rdp-nav_button_previous:hover,
  .rdp-button_reset.rdp-button.rdp-nav_button.rdp-nav_button_next:hover {
    background: none;
  }

  .rdp-month {
    margin: 0;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
  }

  .rdp-month:first-child {
    padding-right: 1rem;
  }

  .rdp-month:last-child {
    padding-left: 1rem;
  }

  .rdp-table {
    width: 100%;
    max-width: none;
  }

  .rdp-head_cell {
    color: ${({ theme }) => theme.COLORS.black};
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%;
    text-transform: none;
  }

  .rdp-head_cell:last-child,
  .rdp-head_cell:nth-last-child(2) {
    color: ${({ theme }) => theme.COLORS.black};
  }

  .rdp-cell {
    color: #2c2c2c;
    font-size: 0.875rem;
  }

  .rdp-button:not([disabled]) {
    /*height: 1.5rem;*/
    /*width: 1.5rem;*/
    /*border-radius: 0.125rem;*/
  }

  .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
    color: ${({ theme }) => theme.COLORS.white};
    background-color: ${({ theme }) => theme.COLORS.black};
    border-radius: 0.25rem;
  }

  .rdp {
    margin: 0 1rem 0 0 !important;
  }
`;

export const Wrapper = styled.div<IMargin & { width?: string }>`
  position: relative;

  width: ${({ width }) => width ?? '100%'};

  ${dayPicker};
`;

export const Calendar = styled(DayPicker)`
  cursor: pointer;
  background: ${({ theme }) => theme.COLORS.white};
  border-radius: 0.25rem;

  border: 1px solid ${({ theme }) => theme.COLORS.white};
  background: ${({ theme }) => theme.COLORS.white};

  box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1);

  @media screen and (min-width: ${MEDIA.tablet}) {
    position: absolute;
    top: 2.5rem;
    right: -1rem;
    padding: 1rem 0;
    z-index: ${INDEX.absolute};
  }

  @media screen and (max-width: ${MEDIA.tablet}) {
    margin: 0 auto;
  }
`;

export const PopupLayoutStyle = styled(PopupLayout)`
  ${dayPicker};
  align-items: center;

  @media screen and (max-width: ${MEDIA.mobile_m}) {
    padding: 3.5rem 0;
  }
`;
