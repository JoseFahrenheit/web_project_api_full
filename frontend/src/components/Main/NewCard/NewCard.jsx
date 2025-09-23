import React, { useState } from "react";

export default function NewCard({ onAddPlaceSubmit }) {
  const [cardData, setCardData] = useState({
    name: '',
    link: ''
  });

  const [isValid, setIsValid] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardData({
      ...cardData,
      [name]: value
    });
    setIsValid(e.target.closest('form').checkValidity());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      onAddPlaceSubmit(cardData);
    }
  };

  return (
    <form className="popup__form" name="card-form" id="new-card-form" noValidate onSubmit={handleSubmit}>
      <div className="popup__field">
        <label>
          <input
            className="popup__input popup__input_type_card-name"
            id="title-input"
            maxLength="30"
            minLength="1"
            name="name"
            placeholder="Título"
            required
            type="text"
            value={cardData.name}
            onChange={handleInputChange}
          />
          <span className="popup__error title-input-error"></span>
        </label>
      </div>

      <div className="popup__field">
        <label>
          <input
            className="popup__input popup__input_type_url"
            id="link-input"
            name="link"
            placeholder="Enlace a la imagen"
            required
            type="url"
            value={cardData.link}
            onChange={handleInputChange}
          />
          <span className="popup__error link-input-error"></span>
        </label>
      </div>

      <button
        className={`button popup__button ${!isValid ? 'popup__button_disabled' : ''}`}
        type="submit"
        disabled={!isValid}
      >
        Crear
      </button>
    </form>
  );
}