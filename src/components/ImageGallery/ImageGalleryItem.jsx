import React from 'react';
import css from './ImageGallery.module.css';

const ImageGalleryItem = ({ tags, webformatURL }) => {
  return (
    <>
      <img className={css.photo} src={webformatURL} alt={tags} />
    </>
  );
};

export default ImageGalleryItem;
