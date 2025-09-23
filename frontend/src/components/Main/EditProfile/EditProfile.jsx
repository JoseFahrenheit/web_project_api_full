import React, { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext.js';

export default function EditProfile() {
  const { currentUser, handleUpdateUser } = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser?.name || '');
  const [description, setDescription] = useState(currentUser?.about || '');

  useEffect(() => {
    setName(currentUser?.name || '');
    setDescription(currentUser?.about || '');
  }, [currentUser]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser({
      name: name,
      about: description
    }).catch(err => {
      console.error('Error al actualizar usuario:', err);
    });
  };

  return (
    <form className="popup__form" name="profile-form" noValidate onSubmit={handleSubmit}>
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_name"
          id="name-input"
          name="name"
          placeholder="Nombre"
          required
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__error name-input-error"></span>
      </label>
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_about"
          id="about-input"
          name="about"
          placeholder="Acerca de mí"
          required
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleDescriptionChange}
        />
        <span className="popup__error about-input-error"></span>
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