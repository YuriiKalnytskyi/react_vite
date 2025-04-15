import { Dispatch, SetStateAction } from 'react';

export type Obj = Record<string, unknown>;
export type Item = Obj | string;
export type Items = Item[];

export interface ArrayHeader {
  text: string;
  data_key: string;
  className?: 'title' | 'id' | string;
  isOrder?: boolean;
  isResizer?: boolean;
}

export interface ITableProps<I extends Items> {
  arrayHeader: ArrayHeader[];
  arrayBody: I;
  parseValue?: (
    value: I[number][keyof I[number]],
    key: string,
    valueObj: I[number],
    index: number
  ) => unknown;
  onNavigate?: (value: I[number]) => void;
  pagination?: {
    total: number;
    page: number;
    pageSize: number;
    setPage: (page: number) => void;
  };
  select?: {
    row_id: keyof I[number];
    items: I[number][keyof I[number]][];
    setItems: Dispatch<SetStateAction<I[number][keyof I[number]][]>>;
    isAllSelect: boolean;
  };
  className?: 'scroll' | 'table' | 'full' | 'pointer' | string;
  tooltipLength?: number;
  linesToTruncate?: number;
  onOrderColumn?: (data_key: string) => void;
}
