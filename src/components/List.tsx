import useList from '../hooks/useList';
import CenterText from './CenterText';
import { Item } from './Item';
import useVirtualScroll from '../hooks/useVirtualScroll';

export default function List() {
  const {
    data,
    isPending,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useList();

  const { parentRef, paddingTop, paddingBottom, visibleData } =
    useVirtualScroll({ hasNextPage, isFetchingNextPage, fetchNextPage, data });

  if (isPending) return <CenterText>로딩 중</CenterText>;
  if (isError) return <CenterText>에러 발생</CenterText>;
  return (
    <>
      <div className="p-4 md:p-6 overflow-y-auto h-full w-full" ref={parentRef}>
        <div style={{ paddingTop: paddingTop, paddingBottom: paddingBottom }}>
          <div className="grid gap-4 md:gap-6 grid-cols-3">
            {visibleData.map((item) => (
              <Item key={item.id} item={item} />
            ))}
          </div>
        </div>

        <div className="pt-4">
          <CenterText>
            {hasNextPage ? '데이터 불러오는 중...' : '마지막 사진입니다.'}
          </CenterText>
        </div>
      </div>
    </>
  );
}
