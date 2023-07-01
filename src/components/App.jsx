import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMorButton from './LoadMorButton/LoadMorButton';
import { Circles } from 'react-loader-spinner';
import css from './Loader/Loader.module.css';

const API_KEY = '36502661-e8ee83efff2e99e0261d33261';
const URL = 'https://pixabay.com/api/';
const quantityPage = 12;
const options = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: 'true',
}).toString();

export class App extends Component {
  state = {
    dataSubmit: '',
    dataResult: [],
    perPage: 12,
    status: 'idle', // "idle"// "pending" // "resolved" // "rejected"
  };

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevState.perPage === this.state.perPage);
    if (prevState.perPage !== this.state.perPage) {
      // Так чомусь не працює(( // завжи показує false?!
      this.getRequest();
    }

    if (prevState.dataSubmit !== this.state.dataSubmit) {
      this.setState({ status: 'pending' });
      this.getRequest();
    }
  }

  getRequest = async () => {
    const { dataSubmit, perPage } = this.state;
    await axios
      .get(
        `${URL}?key=${API_KEY}&q=${dataSubmit}&per_page=${perPage}&${options}`
      )
      .then(({ data }) => {
        if (data.hits.length > 0) {
          this.setState({ dataResult: data.hits });
          this.setState({ status: 'resolved' });
        } else {
          this.setState({ status: 'rejected' });
          toast.error(
            'Nothing was found according to your request! Please enter another request!'
          );
        }
      })
      .catch(error => {
        this.setState({ status: 'rejected' });
        toast.error(error.message);
      })
      .finally();
  };

  onSubmit = dataSubmit => {
    this.setState({ dataSubmit });
    this.setState({ perPage: quantityPage });
  };

  loadMor = () => {
    this.setState(prevState => {
      prevState.perPage += quantityPage;

      this.setState({ status: 'pending' });
      this.getRequest();
    });
  };

  render() {
    const length = this.state.dataResult.length;
    const { dataResult, status } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.onSubmit} />
        {/* Якщо так то при Load More прокручує до верху сторінки */}
        {/* {status === 'resolved' && <ImageGallery images={dataResult} />} */}
        {length !== 0 && <ImageGallery images={dataResult} />}

        {length !== 0 && length % 12 === 0 && status === 'resolved' && (
          <LoadMorButton loadMor={this.loadMor} />
        )}

        {status === 'pending' && (
          <Circles
            height="80"
            width="80"
            color="#4d78a9"
            wrapperClass={css.loader}
          />
        )}

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
