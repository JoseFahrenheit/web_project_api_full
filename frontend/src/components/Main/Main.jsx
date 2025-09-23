import React, { useState, useEffect, useContext } from 'react';
import Popup from './Popup/Popup.jsx';
import NewCard from './NewCard/NewCard.jsx';
import EditProfile from './EditProfile/EditProfile.jsx';
import EditAvatar from './EditAvatar/EditAvatar.jsx';
import Card from './Card/Card.jsx';
import ImagePopup from './ImagePopup/ImagePopup.jsx';
import profile_rectangle from '../../images/profile_Rectangle.png';
import profile_vector from '../../images/profile_Vector.png';
import add_vector from '../../images/add_Vector.png';
import add_rectangle from '../../images/add_Rectangle.png';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function Main({ activePopup, selectedCard, cards, onCardLike, onCardDelete, onAddPlaceSubmit, onOpenPopup, onClosePopup, onCardSelect }) {
  const { currentUser } = useContext(CurrentUserContext);

  const handleOpenPopup = (popupName) => {
    onOpenPopup(popupName);
  };

  const handleClosePopup = () => {
    onClosePopup();
  };

  const handleCardClick = (card) => {
    onCardSelect(card);
    onOpenPopup('image');
  };

  return (
    <main className="content">
      <section className="profile">
        <div
          className="profile__avatar-container"
          onClick={() => handleOpenPopup('edit-avatar')}
        >
          <img
            src={currentUser?.avatar}
            alt="Avatar del usuario"
            className="profile__avatar"
          />
        </div>
        <div className="profile__info">
          <div className="profile__name-container">
            <h2 className="profile__name">{currentUser?.name}</h2>
            <div
              className="profile__edit"
              onClick={() => handleOpenPopup('edit-profile')}
            >
              <img
                src={profile_rectangle}
                alt="Ilustración 'Rectangulo'"
                className="profile__rectangle"
              />
              <img
                src={profile_vector}
                alt="Ilustración 'profile Vector'"
                className="profile__vector"
              />
            </div>
          </div>
          <p className="profile__job">{currentUser?.about}</p>
        </div>
        <div
          className="profile__add-button"
          onClick={() => handleOpenPopup('add-element')}
        >
          <img
            src={add_vector}
            alt="Ilustración 'add'"
            className="profile__add-vector"
          />
          <img
            src={add_rectangle}
            alt="Ilustración 'Rectangulo'"
            className="profile__add-rectangle"
          />
        </div>
      </section>

      <section className="elements">
        <ul className="elements__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>

      <Popup
        isOpen={activePopup === 'edit-profile'}
        onClose={handleClosePopup}
        title="Editar perfil"
        name="edit-profile"
      >
        <EditProfile />
      </Popup>

      <Popup
        isOpen={activePopup === 'add-element'}
        onClose={handleClosePopup}
        title="Nuevo lugar"
        name="add-element"
      >
        <NewCard onAddPlaceSubmit={onAddPlaceSubmit} />
      </Popup>

      <Popup
        isOpen={activePopup === 'edit-avatar'}
        onClose={handleClosePopup}
        title="Cambiar foto de perfil"
        name="edit-avatar"
      >
        <EditAvatar />
      </Popup>

      <ImagePopup
        isOpen={activePopup === 'image'}
        card={selectedCard}
        onClose={handleClosePopup}
      />
    </main>
  );
}

export default Main;