import React, { useEffect } from 'react';
import '../../../../blocks/popup.css';

export default function Popup({ isOpen, onClose, title, children, name }) {
  const handleEscClose = (e) => {
    if (e.key === 'Escape') onClose();
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscClose);
    }
    return () => document.removeEventListener('keydown', handleEscClose);
  }, [isOpen, onClose]);

  return (
    <div
      className={`popup ${isOpen ? 'popup_opened' : ''}`}
      id={`${name}-popup`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={`popup__container ${!title ? 'popup__image-container' : ''}`}>
        <button
          className="popup__close"
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
        />
        {title && <h2 className="popup__title">{title}</h2>}
        {children}
      </div>
    </div>
  );
}