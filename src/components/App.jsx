import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { fetchImages } from './services/gallery.service.js';
import './App.css';

export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    isLoading: false,
    showModal: false,
    largeImageURL: '',
    imageTags: '',
    error: null,
    totalHits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.page !== this.state.page
    ) {
      this.getImages();
    }
  }

  // Асинхронний метод для отримання зображень
  getImages = async () => {
    const { searchQuery, page } = this.state;
    this.setState({ isLoading: true, error: null });

    try {
      const data = await fetchImages(searchQuery, page);
      const newImages = data.hits.map(
        ({ id, webformatURL, largeImageURL, tags }) => ({
          id,
          webformatURL,
          largeImageURL,
          tags,
        })
      );

      this.setState(prevState => ({
        images: [...prevState.images, ...newImages],
        totalHits: data.totalHits,
      }));

      // Прокрутка сторінки вниз після завантаження
      if (page > 1) {
        window.scrollBy({
          top: 500, // Можете налаштувати значення
          behavior: 'smooth',
        });
      }
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearchSubmit = query => {
    this.setState({
      searchQuery: query,
      page: 1, // Скидаємо сторінку при новому пошуку
      images: [], // Очищаємо зображення при новому пошуку
      totalHits: 0,
    });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleImageClick = (largeImageURL, tags) => {
    this.setState({ showModal: true, largeImageURL, imageTags: tags });
  };

  handleModalClose = () => {
    this.setState({ showModal: false, largeImageURL: '', imageTags: '' });
  };

  render() {
    const {
      images,
      isLoading,
      showModal,
      largeImageURL,
      imageTags,
      error,
      totalHits,
    } = this.state;
    const showLoadMoreButton =
      images.length > 0 && images.length < totalHits && !isLoading;

    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearchSubmit} />
        {error && (
          <p className="errorMessage">
            Whoops, something went wrong: {error.message}
          </p>
        )}
        {images.length > 0 && (
          <ImageGallery images={images} onImageClick={this.handleImageClick} />
        )}
        {isLoading && <Loader />}
        {showLoadMoreButton && <Button onClick={this.handleLoadMore} />}
        {showModal && (
          <Modal
            imageURL={largeImageURL}
            imageTags={imageTags}
            onClose={this.handleModalClose}
          />
        )}
      </div>
    );
  }
}

export default App;

// export const App = () => {
//   return (
//     <div
//       style={{
//         height: '100vh',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         fontSize: 40,
//         color: '#010101',
//       }}
//     >
//       React homework template
//     </div>
//   );
// };
