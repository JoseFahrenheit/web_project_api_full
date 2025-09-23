import React, { useRef, useContext } from 'react';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext.js';

export default function EditAvatar() {
  const { handleUpdateAvatar } = useContext(CurrentUserContext);
  const avatarRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    handleUpdateAvatar(avatarRef.current.value)
      .catch(err => {
        console.error('Error al actualizar avatar', err);
      });
  };

  return (
    <form className="popup__form" name="avatar-form" noValidate onSubmit={handleSubmit}>
      <label className="popup__field">
        <input
          ref={avatarRef}
          className="popup__input popup__input_type_avatar"
          id="avatar-input"
          name="avatar"
          placeholder="Enlace a la imagen"
          required
          type="url"
        />
        <span className="popup__error avatar-input-error"></span>
      </label>
      <button
        className="button popup__button popup__button_disabled"
        type="submit"
      >
        Guardar
      </button>
    </form>
  );
}