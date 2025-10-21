import { useEffect, useRef } from 'react';

interface ScrollProps {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}
export default function useScroll({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: ScrollProps) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { root: null, rootMargin: '200px 0px', threshold: 0 }
    );

    io.observe(el);
    return () => io.unobserve(el);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return { sentinelRef };
}
