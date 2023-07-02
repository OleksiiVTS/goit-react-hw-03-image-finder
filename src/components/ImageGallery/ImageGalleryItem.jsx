import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import css from './ImageGallery.module.css';

export default class ImageGalleryItem extends Component {
  state = {
    dataImage: {},
    openModalWindow: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.dataImage !== this.state.dataImage) {
      this.setState(prevState => ({ openModalWindow: true }));
    }
  }

  showModalWindow = () => {
    const { tags, largeImageURL } = this.props;
    const data = { largeImageURL, tags };
    this.setState(prevState => ({ dataImage: data }));
  };

  closeModalWindow = () => {
    this.setState(prevState => ({ openModalWindow: false }));
  };

  render() {
    const { tags, webformatURL } = this.props;
    return (
      <>
        <img
          onClick={this.showModalWindow}
          className={css.photo}
          src={webformatURL}
          alt={tags}
        />
        {this.state.openModalWindow === true && (
          <Modal
            dataImage={this.state.dataImage}
            closeModalWindow={this.closeModalWindow}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
