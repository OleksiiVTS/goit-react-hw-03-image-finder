import React, { Component } from 'react';
import { getApiImageGallery, quntityPage } from './Services/Api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import LoadMorButton from './LoadMorButton/LoadMorButton';
import { Circles } from 'react-loader-spinner';
import css from './Loader/Loader.module.css';

export class App extends Component {
  state = {
    dataSubmit: '',
    dataResult: [],
    page: 1,
    totalImages: 0,
    status: 'idle', // "idle"// "pending" // "resolved" // "rejected"
  };

  componentDidUpdate(prevProps, prevState) {
    const { dataSubmit, page } = this.state;
    if (prevState.dataSubmit !== dataSubmit || prevState.page !== page) {
      this.getRequest();
    }
  }

  getRequest = async () => {
    const { dataSubmit, page } = this.state;
    this.setState({ status: 'pending' });

    try {
      const { data } = await getApiImageGallery(dataSubmit, page);
      if (!data.totalHits) {
        this.setState({ status: 'rejected' });
        toast.error(
          'Nothing was found according to your request! Please enter another request!'
        );
        return;
      }
      this.setState(prevState => ({
        dataResult: [...prevState.dataResult, ...data.hits],
        status: 'resolved',
        totalImages: data.totalHits,
      }));
    } catch (error) {
      this.setState({ status: 'rejected' });
      toast.error(error.message);
    }
  };

  onSubmit = dataSubmit => {
    if (this.state.dataSubmit === dataSubmit) {
      return;
    }
    this.setState({ dataSubmit, page: 1, dataResult: [] });
  };

  loadMor = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  render() {
    const length = this.state.dataResult.length;
    const { dataResult, status } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />

        {length !== 0 && <ImageGallery images={dataResult} />}

        {length !== 0 &&
          length % quntityPage === 0 &&
          status === 'resolved' && <LoadMorButton loadMor={this.loadMor} />}

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
      </>
    );
  }
}
