import { React, useEffect } from 'react';
import { StyledModal, StyledOverlay } from './Modal.styled';

export const Modal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const onEsc = e => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', onEsc);

    return () => {
      document.removeEventListener('keydown', onEsc);
    };
  }, [onClose]);

  const clickHandler = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <StyledOverlay classNeme="overlay" onClick={clickHandler}>
      <StyledModal className="modal">
        <img src={isOpen} alt="" />
      </StyledModal>
    </StyledOverlay>
  );
};
