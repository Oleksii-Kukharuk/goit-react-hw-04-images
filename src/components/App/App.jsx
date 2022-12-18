import { Searchbar } from '../Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { ContainerApp } from './App.styled';

import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';

export const App = () => {
  const [search, setSearch] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const onSeachInfo = data => {
    console.log(data);
  };

  const onFormSubmit = search => {
    setSearch(search);
  };

  const selectImage = imgUrl => {
    setSelectedImage({ selectedImage: imgUrl });
  };

  return (
    <ContainerApp>
      <Searchbar onSubmit={onFormSubmit} />
      <ImageGallery
        searchQuery={search}
        onChange={onSeachInfo}
        onSelect={selectImage}
      />
      <ToastContainer autoClose={4000} />
      {selectedImage !== null && (
        <Modal isOpen={selectedImage} onClose={() => selectImage(null)} />
      )}
    </ContainerApp>
  );
};
