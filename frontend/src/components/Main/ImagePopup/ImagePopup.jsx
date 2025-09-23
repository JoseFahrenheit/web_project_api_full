import React from 'react';
import '../../../../blocks/popup.css';

function ImagePopup({ isOpen, card, onClose }) {
  return (
    <div className={`popup popup_type_image ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_content_image">
        <button
          type="button"
          className="popup__close popup__close_type_image"
          aria-label="Cerrar ventana"
          onClick={onClose}
        />
        {card && (
          <div className="popup__content popup__content_type_image">
            <img
              className="popup__image"
              src={card.link}
              alt={card.name}
            />
            <p className="popup__caption">{card.name}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImagePopup;