import React from 'react';
import './InfoTooltip.css';
import successImage from '../../images/Success.png';
import failImage from '../../images/Fail.png';
import closeImage from '../../images/close.png';

const InfoTooltip = ({ isOpen, onClose, isSuccess, message }) => {
  if (!isOpen) return null;

  return (
    <div className={`popup popup_type_tooltip ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_type_tooltip">
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        >
          <img src={closeImage} alt="Cerrar" className="popup__close-image" />
        </button>
        <div className="tooltip">
          <img
            src={isSuccess ? successImage : failImage}
            alt={isSuccess ? "Éxito" : "Error"}
            className="tooltip__image"
          />
          <h2 className="tooltip__title">{message}</h2>
        </div>
      </div>
    </div>
  );
};

export default InfoTooltip;