import React, { Component } from 'react';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Searchbar extends Component {
  state = {
    search: '',
  };

  handleValue = evt => {
    this.setState(prevState => ({
      search: evt.target.value,
    }));
  };

  handleSabmit = evt => {
    evt.preventDefault();
    if (this.state.search.trim() === '') {
      toast.warn('Please enter a request!', {
        autoClose: 1000,
        hideProgressBar: true,
        theme: 'colored',
      });
      return;
    }
    this.props.onSubmit(this.state.search.trim());
    this.setState({
      search: '',
    });
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSabmit}>
          <button type="submit">
            <span>Search</span>
          </button>
          <input
            onChange={this.handleValue}
            value={this.state.search}
            name="searchQuery"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
