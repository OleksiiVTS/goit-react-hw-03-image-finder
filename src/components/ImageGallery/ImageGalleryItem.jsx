import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

const ImageGalleryItem = ({ tags, webformatURL }) => {
  return (
    <>
      <img className={css.photo} src={webformatURL} alt={tags} />
    </>
  );
};

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
