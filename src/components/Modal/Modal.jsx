import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import './Modal.css';

const modalRoot = document.querySelector('#modal-root'); // Це ID елемента в index.html

export class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    imageURL: PropTypes.string.isRequired,
    imageTags: PropTypes.string.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { imageURL, imageTags } = this.props;

    return createPortal(
      <div className="Overlay" onClick={this.handleOverlayClick}>
        <div className="Modal">
          <img src={imageURL} alt={imageTags} />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
