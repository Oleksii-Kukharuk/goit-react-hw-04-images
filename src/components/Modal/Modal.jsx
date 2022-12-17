import React from 'react';
import { StyledModal, StyledOverlay } from './Modal.styled';

export class Modal extends React.Component {
  componentDidMount() {
    document.addEventListener('keydown', this.onEsc);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onEsc);
  }

  onEsc = e => {
    if (e.key === 'Escape') {
      this.props.onClose();
    }
  };

  clickHandler = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };
  render() {
    const { isOpen } = this.props;
    return (
      <StyledOverlay
        classNeme="overlay"
        onClick={this.clickHandler}
        onKeyDown={this.onEsc}
      >
        <StyledModal className="modal">
          <img src={isOpen} alt="" />
        </StyledModal>
      </StyledOverlay>
    );
  }
}
