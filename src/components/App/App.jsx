import { Component } from 'react';
import { Searchbar } from '../Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { ContainerApp } from './App.styled';

import { Modal } from 'components/Modal/Modal';

export class App extends Component {
  state = {
    search: '',
    selectedImage: null,
  };

  onSeachInfo = data => {
    console.log(data);
  };

  onFormSubmit = search => {
    this.setState({ search: search });
  };

  selectImage = imgUrl => {
    this.setState({ selectedImage: imgUrl });
  };

  render() {
    const { selectedImage } = this.state;
    return (
      <ContainerApp>
        <Searchbar onSubmit={this.onFormSubmit} />
        <ImageGallery
          searchQuery={this.state.search}
          onChange={this.onSeachInfo}
          onSelect={this.selectImage}
        />
        <ToastContainer autoClose={4000} />
        {selectedImage !== null && (
          <Modal
            isOpen={selectedImage}
            onClose={() => this.selectImage(null)}
          />
        )}
      </ContainerApp>
    );
  }
}
