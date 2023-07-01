import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

const API_KEY = '36502661-e8ee83efff2e99e0261d33261';
const URL = 'https://pixabay.com/api/';
const quantityPage = 12;
const options = new URLSearchParams({
  per_page: quantityPage,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
}).toString();

export class App extends Component {
  state = {
    dataSubmit: '',
    dataResult: [],
    pageLoadMore: 1,
    status: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.dataSubmit !== this.state.dataSubmit) {
      this.getRequest();
    }
  }

  getRequest = async () => {
    const { dataSubmit, pageLoadMore } = this.state;
    await axios
      .get(
        `${URL}?key=${API_KEY}&q=${dataSubmit}&page=${pageLoadMore}&${options}`
      )
      .then(({ data }) => {
        if (data.hits.length > 0) {
          this.setState({ dataResult: data.hits });
        } else {
          toast.error(
            'Nothing was found according to your request! Please enter another request!'
          );
        }
      })
      .catch(error => toast.error(error.message))
      .finally();
  };

  onSubmit = dataSubmit => {
    this.setState({ dataSubmit });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery images={this.state.dataResult} />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    );
  }
}
