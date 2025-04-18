import styled, { css } from 'styled-components';

import { FONTS, MEDIA, SPACES } from '@/theme';

import { Fonts } from '../../styles';

const layoutCss = css`
  display: table;
  width: 100%;
  height: 2.5rem;
  table-layout: fixed;
`;

const cellControlledSizes = css`
  padding: ${FONTS.SIZES.xxsm} ${FONTS.SIZES.l};

  &.title {
    width: 13rem;
    min-width: 13rem;
  }

  &.id {
    width: 5rem;
    min-width: 5rem;
  }

  &.checkbox {
    width: 3.3rem;
  }
`;
export const Content = styled.section`
  position: relative;
`;

// ================= table components START ====================//
export const Container = styled.div`
  box-shadow: 0 0 0.625rem ${({ theme }) => theme.rgba(theme.COLORS.black, 0.2)};
  width: 100%;
  min-height: fit-content;
  &.scroll {
    width: 100% !important;
    overflow-x: auto;
    overflow-y: hidden;

    &::-webkit-scrollbar {
      height: 0.4rem;
    }

    & > table {
      display: table;
      table-layout: auto;

      & > thead > tr > th,
      & > tr > td {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        & > strong {
          display: inline-block;
          max-width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
`;

export const Wrapper = styled.div`
  overflow: hidden;
  box-shadow: 0 0 0.625rem ${({ theme }) => theme.rgba(theme.COLORS.black, 0.2)};
  min-height: fit-content;
`;
export const Table = styled.table`
  width: 100%;
  min-width: 100%;
  position: relative;

  &.full {
    width: 81.25rem;
  }

  &.scroll {
    width: 81.25rem;
  }

  &.pointer {
    tbody tr * {
      cursor: pointer !important;
    }
  }

  border-collapse: collapse;

  @media screen and (max-width: ${MEDIA.tablet_s}) {
    width: 81.25rem;
  }
`;

export const Head = styled.thead`
  ${layoutCss};
  position: sticky;
  top: 0;
  z-index: 1;
`;

export const Body = styled.tbody`
  //position: relative;

  ${layoutCss};

  & > tr {
    border-bottom: 1px solid ${({ theme }) => theme.rgba(theme.COLORS.black, 0.1)};
  }

  & > tr:hover * {
    cursor: pointer;
  }
`;

export const HeadRow = styled.th`
  ${Fonts};
  height: 3rem;
  letter-spacing: 0.0175rem;
  text-transform: uppercase;
  color: ${({ theme }) => theme.COLORS.white};
  background-color: ${({ theme }) => theme.COLORS.primary};

  position: relative;

  &:last-child {
    border-right: none;
  }

  ${cellControlledSizes};

  & > .order,
  & > .resizer {
    position: absolute;
    top: 50%;
    right: 1rem;

    transform: translate(-50%, -50%);

    &:hover {
      background: ${({ theme }) => theme.rgba(theme.COLORS.black, 0.5)};
    }
  }

  ,
  & > .order {
    right: 1rem;
    &:hover {
      background: ${({ theme }) => theme.rgba(theme.COLORS.black, 0.5)};
    }
  }

  & > .resizer {
    right: 0;
    transform: translate(0, -50%);

    cursor: e-resize;
  }
`;

export const Row = styled.tr`
  ${layoutCss};

  z-index: 1;
  transition: background 0.4s ease-in-out;

  & > td > strong {
    text-transform: none;
  }

  &:hover {
    background: ${({ theme }) => theme.rgba(theme.COLORS.primary, 0.2)};
    box-shadow: 0 2px 8px ${({ theme }) => theme.rgba(theme.COLORS.black, 0.1)};
  }
`;

export const Data = styled.td`
  font-weight: ${FONTS.WEIGHTS.normal};
  font-size: ${FONTS.SIZES.m};
  word-break: break-word;
  position: relative;

  &:hover::before {
    content: '';
    position: absolute;
    right: 0;
    left: 0;
    top: -9999px;
    bottom: -9999px;
    background-color: ${({ theme }) => theme.rgba(theme.COLORS.primary, 0.1)};
    z-index: -1;
  }

  ${cellControlledSizes}
`;
// ================= table components END ====================//

const labelPriceCommonStyles = css`
  ${Fonts};
`;

export const ItemLabel = styled.div<{
  $linesToTruncate: number;
}>`
  position: relative;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: ${({ $linesToTruncate }) => $linesToTruncate};
  white-space: normal;
  ${labelPriceCommonStyles};
`;

export const WrapperPagination = styled.div`
  width: fit-content;
  margin: 0 auto;
`;

export const Tooltip = styled.div`
  display: flex;
  width: 100%;
  max-height: 14rem;
  min-height: 4rem;
  height: fit-content !important;
  min-width: 10rem;
  max-width: 10rem;

  padding: ${SPACES.xxxxxs} ${SPACES.xs};
  word-wrap: break-word;
  word-break: break-all;

  ${labelPriceCommonStyles};

  background: ${({ theme }) => theme.COLORS.white};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.rgba(theme.COLORS.black, 0.4)};
  box-shadow: 0 0 4px ${({ theme }) => theme.rgba(theme.COLORS.black, 0.8)};

  position: absolute;
  z-index: 1;
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior-y: none;

  &::-webkit-scrollbar {
    width: 0.3rem;
  }

  &::-webkit-scrollbar-track {
    border-radius: 0.25rem;
    background-color: ${({ theme }) => theme.rgba(theme.COLORS.primary, 0.2)};
    margin-block: 0.2rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.COLORS.primary};
    border-radius: 0.25rem;
  }
`;
