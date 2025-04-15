import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import styled, { RuleSet } from 'styled-components';

import { Pagination } from '@/module/common/component';
import { Prettify } from '@/module/common/types';
import { SPACES } from '@/theme';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { IList, IListIndex, ItemsKey } from './list.type.ts';

export const List = <T, P>({ type, request, ...props }: IList<T, P>) => {
  const limit = request?.limit ?? 10;

  if (type === 'infinite') {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
      queryKey: [request.key, request?.options_sort ?? {}],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await request.function({
          page: pageParam,
          limit,
          ...(request?.options_sort ?? {})
        } as P);

        const items = res[request.items_key] as Prettify<
          T[ItemsKey<T>] extends (infer U)[] ? U : T[ItemsKey<T>]
        >;
        const count = Number(res?.[request.count_key]) ?? 0;

        return {
          items,
          count,
          nextPage: pageParam + 1,
          hasMore: ((Array.isArray(items) ? items : [])?.length ?? 0) > 0
        };
      },
      getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.nextPage : undefined),
      initialPageParam: 1
    });

    const items = data?.pages.flatMap((page) => page.items) as Prettify<T>[];
    const isViewportEnter =
      type === 'infinite' && 'isViewportEnter' in props ? props.isViewportEnter : false;

    return (
      <>
        <ListIndex {...props} items={items} />

        {hasNextPage && (
          <motion.button
            viewport={{ once: true, margin: '0px' }}
            onViewportEnter={() => isViewportEnter && fetchNextPage()}
            onClick={() => fetchNextPage()}
          >
            {isFetchingNextPage ? 'Loading...' : 'Load more'}
          </motion.button>
        )}
      </>
    );
  }

  if (type === 'pagination') {
    const [page, setPage] = useState(1);
    const dependencies = { ...(request?.options_sort ?? {}), page, limit };

    const { data: dataPagination } = useQuery({
      queryKey: [request.key, dependencies],
      queryFn: async () => {
        return await request.function({
          page,
          limit,
          ...(request?.options_sort ?? {})
        } as P);
      }
    });

    const items = dataPagination?.[request.items_key] as Prettify<T>[];
    const count = Number(dataPagination?.[request.count_key]) ?? 0;

    return (
      <>
        <ListIndex {...props} items={items} />
        <Pagination
          onPageChange={setPage}
          currentPage={page}
          totalCount={count}
          pageSize={request.limit ?? 10}
        />
      </>
    );
  }
};
const ListIndex = <T,>({ ulStyle, liStyle, items, parse }: IListIndex<T>) => (
  <Ul ulStyle={ulStyle}>
    <AnimatePresence initial={false}>
      {(Array.isArray(items) ? items : []).map((value, i) => (
        <Li
          key={i}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          liStyle={liStyle}
        >
          {parse(value as Prettify<T[ItemsKey<T>] extends (infer U)[] ? U : T[ItemsKey<T>]>)}
        </Li>
      ))}
    </AnimatePresence>
  </Ul>
);

const Ul = styled.ul<{ ulStyle?: RuleSet<object> }>`
  display: flex;
  flex-wrap: wrap;
  gap: ${SPACES.l};

  ${({ ulStyle }) => ulStyle && ulStyle};
`;

const Li = styled(motion.li)<{ liStyle?: RuleSet<object> }>`
  list-style: none;

  ${({ liStyle }) => liStyle && liStyle};
`;
