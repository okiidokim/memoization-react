import React from 'react';
import { resizeImage } from '../lib/resizeImage';
import type ItemType from '../types/ItemType';

const ItemComponent = ({ item }: { item: ItemType }) => {
  return (
    <div className="flex flex-col gap-1" data-index={item.id}>
      <div className="h-25 relative flex items-center rounded-md bg-main-color shadow-box">
        <img
          src={resizeImage(item.download_url)}
          alt="이미지"
          className="w-full h-full object-contain rounded-md"
        />
      </div>
      <span className="text-[0.75rem]">
        저자
        <br />
        <b>{item.author}</b>
      </span>
    </div>
  );
};

export const Item = React.memo(ItemComponent);
