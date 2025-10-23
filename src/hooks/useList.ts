import getList from '../apis/getList';
import { useInfiniteQuery } from '@tanstack/react-query';
import type ItemType from '../types/ItemType';

export default function useList() {
  const listMethods = useInfiniteQuery({
    queryKey: ['list'],
    queryFn: async ({ pageParam = 0 }): Promise<ItemType[]> => {
      const limit = pageParam === 0 ? 30 : 15;
      const response = await getList({ page: pageParam, limit });
      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage ? allPages.length + 1 : undefined,
  });

  return { ...listMethods };
}
