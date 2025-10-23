import useList from '../hooks/useList';
import useScroll from '../hooks/useScroll';
import CenterText from './CenterText';
import { Item } from './Item';

export default function List() {
  const {
    data,
    isPending,
    isError,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useList();
  const { sentinelRef } = useScroll({
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  });

  if (isPending) return <CenterText>로딩 중</CenterText>;
  if (isError) return <CenterText>에러 발생</CenterText>;
  return (
    <div>
      <div className="grid gap-4 md:gap-6 grid-cols-3">
        {data?.pages.flat().map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </div>
      <div className="h-32 flex flex-col justify-center" ref={sentinelRef}>
        {isFetching && hasNextPage && (
          <CenterText>데이터 불러오는 중...</CenterText>
        )}
        {isFetching && !hasNextPage && (
          <CenterText>마지막 사진입니다.</CenterText>
        )}
      </div>
    </div>
  );
}
