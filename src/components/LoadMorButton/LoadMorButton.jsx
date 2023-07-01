import React from 'react';
import PropTypes from 'prop-types';
import css from './LoadMorButton.module.css';

const LoadMorButton = ({ loadMor }) => {
  return (
    <button className={css.loadMore} type="button" onClick={loadMor}>
      Load more
    </button>
  );
};

LoadMorButton.propTypes = {
  loadMor: PropTypes.func.isRequired,
};

export default LoadMorButton;
