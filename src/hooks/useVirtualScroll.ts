import { useVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useMemo, useRef } from 'react';
import type ItemType from '../types/ItemType';

interface ScrollProps {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  data: any;
}
export default function useVirtualScroll({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  data,
}: ScrollProps) {
  const dataList: ItemType[] = useMemo(
    () => (data ? data.pages.flat() : []),
    [data]
  );
  const parentRef = useRef<HTMLDivElement>(null);

  const COLS = 3;
  const rowCount = Math.ceil(dataList.length / COLS);

  const listVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 128,
    overscan: 3,
  });

  const vItems = listVirtualizer.getVirtualItems();
  const totalSize = listVirtualizer.getTotalSize();
  const firstRow = vItems[0]?.index ?? 0;
  const lastRow = vItems[vItems.length - 1]?.index ?? -1;
  const startIndex = firstRow * COLS;
  const endIndex =
    lastRow >= firstRow ? Math.min((lastRow + 1) * COLS, dataList.length) : 0;
  const visibleData =
    vItems.length === 0
      ? dataList.slice(0, COLS * 5)
      : dataList.slice(startIndex, endIndex);

  const paddingTop = vItems[0]?.start ?? 0;
  const paddingBottom = totalSize - (vItems[vItems.length - 1]?.end ?? 0);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage || vItems.length === 0) return;
    const nearEnd = (vItems[vItems.length - 1].index ?? 0) >= rowCount - 5;
    if (nearEnd) fetchNextPage();
  }, [vItems, rowCount, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return { parentRef, paddingTop, paddingBottom, visibleData };
}
