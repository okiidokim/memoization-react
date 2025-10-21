export default function Item({ item }: { item: any }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="h-25 relative flex items-center rounded-md bg-main-color shadow-box">
        <img
          src={item.download_url}
          alt="이미지"
          className="w-full h-full object-contain"
        />
      </div>
      <span className="text-[0.75rem]">
        저자
        <br />
        <b>{item.author}</b>
      </span>
    </div>
  );
}
