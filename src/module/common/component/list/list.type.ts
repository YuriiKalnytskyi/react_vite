import { ReactNode } from 'react';
import { RuleSet } from 'styled-components';

import { Prettify } from '@/module/common/types';

type OptionsSort<P> = Prettify<Omit<P, 'page' | 'limit'>>;
type OptionsSortWithRequired<P> = OptionsSort<P> extends Record<string, never>
  ? { options_sort?: never }
  : { options_sort: OptionsSort<P> };

export type ItemsKey<T> = {
  [K in keyof T]: T[K] extends any[] ? K : never;
}[keyof T];

type CountKey<T> = {
  [K in keyof T]: T[K] extends number | string ? K : never;
}[keyof T];

export interface IListIndex<T> {
  liStyle?: RuleSet<object>;
  ulStyle?: RuleSet<object>;
  items: Prettify<T>[];
  parse: (item: Prettify<T[ItemsKey<T>] extends (infer U)[] ? U : T[ItemsKey<T>]>) => ReactNode;
}

type IInfinite = {
  type: 'infinite';
  isViewportEnter?: boolean;
};

type IPagination = {
  type: 'pagination';
};

export type IList<T, P> = Omit<IListIndex<T>, 'items'> &
  (IInfinite | IPagination) & {
    request: {
      key: string;
      items_key: ItemsKey<T>;
      count_key: CountKey<T>;
      function: (data: P) => Promise<T>;
      limit?: number;
    } & OptionsSortWithRequired<P>;
  };
