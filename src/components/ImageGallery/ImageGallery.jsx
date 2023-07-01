import React, { Component } from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGallery/ImageGalleryItem';
import Modal from 'components/Modal/Modal';

export default class ImageGallery extends Component {
  state = {
    dataImage: {},
    openModalWindow: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.dataImage !== this.state.dataImage) {
      console.log('Start modal window');
      this.setState(prevState => ({ openModalWindow: true }));
    }
  }

  showModalWindow = (largeImageURL, tags) => {
    const data = { largeImageURL, tags };
    this.setState(prevState => ({ dataImage: data }));
  };

  render() {
    return (
      <ul className={css.container}>
        {this.props.images.map(image => {
          const { id, tags, webformatURL, largeImageURL } = image;
          return (
            <li
              className={css.photoLi}
              key={id}
              onClick={() => this.showModalWindow(largeImageURL, tags)}
            >
              <ImageGalleryItem
                className={css.photo}
                tags={tags}
                webformatURL={webformatURL}
              />
            </li>
          );
        })}
        {this.state.openModalWindow === true && (
          <Modal dataImage={this.state.dataImage} />
        )}
      </ul>
    );
  }
}
