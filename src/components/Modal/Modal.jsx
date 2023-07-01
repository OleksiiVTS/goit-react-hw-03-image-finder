import React from 'react';

const Modal = ({ dataImage }) => {
  const { largeImageURL, tags } = dataImage;
  return (
    <div class="overlay">
      <div class="modal">
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
};

export default Modal;
