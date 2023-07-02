import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGallery/ImageGalleryItem';

const ImageGallery = ({ images }) => {
  return (
    <ul className={css.container}>
      {images.map(image => {
        const { id, tags, webformatURL, largeImageURL } = image;
        return (
          <li className={css.photoLi} key={id}>
            <ImageGalleryItem
              className={css.photo}
              tags={tags}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
            />
          </li>
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};

export default ImageGallery;
