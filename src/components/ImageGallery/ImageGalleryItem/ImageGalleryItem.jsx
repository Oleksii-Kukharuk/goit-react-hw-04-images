import React from 'react';
import { GalleryImg, GalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ smallImg, bigImg, onSelect }) => {
  return (
    <GalleryItem>
      <GalleryImg
        src={smallImg}
        alt="serchedImage"
        onClick={() => onSelect(bigImg)}
      />
    </GalleryItem>
  );
};
