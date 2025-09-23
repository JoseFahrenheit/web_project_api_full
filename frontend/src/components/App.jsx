import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import api from '../utils/Api.jsx';
import Header from './Header/Header.jsx';
import Main from './Main/Main.jsx';
import Footer from './Footer/Footer.jsx';

function App({ userEmail, onLogout }) {
  console.log('App - userEmail recibido:', userEmail);

  const [currentUser, setCurrentUser] = useState(null);
  const [activePopup, setActivePopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userEmail) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch(err => {
          console.error('Error fetching data:', err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [userEmail]);

  const handleCardLike = async (card) => {
    const isCurrentlyLiked = card.likes?.some(user => user._id === currentUser?._id);

    try {
      const newCard = await api.toggleLike(card._id, !isCurrentlyLiked);
      setCards(prev => prev.map(c => c._id === card._id ? newCard : c));
    } catch(error) {
      console.error('Error:', error);
    }
  };

  const handleCardDelete = async (card) => {
    try {
      await api.deleteCard(card._id);
      setCards(prevCards => prevCards.filter(c => c._id !== card._id));
    } catch(error) {
      console.error('Error al eliminar tarjeta:', error);
    }
  }

  const handleOpenPopup = (popupName) => setActivePopup(popupName);
  const handleClosePopup = () => {
    setActivePopup(null);
    setSelectedCard(null);
  };

  const handleUpdateUser = (data) => {
    return api.updateUserInfo(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
        return newData;
      })
      .catch(err => {
        console.error('Error updating user:', err);
        throw err;
      });
  };

  const handleUpdateAvatar = (avatarUrl) => {
    return api.updateAvatar(avatarUrl)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
        return newData;
      })
      .catch(err => {
        console.error('Error updating avatar:', err);
        throw err;
      });
  };

  const handleAddPlaceSubmit = async (cardData) => {
    try {
      const newCard = await api.addNewCard(cardData);
      setCards([newCard, ...cards]);
      handleClosePopup();
    } catch(error) {
      console.error('Error al crear nueva tarjeta:', error);
    }
  };

  if (isLoading) {
    return <div className="loading">Cargando...</div>;
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, handleUpdateUser, handleUpdateAvatar }}>
      <div className="page">
        <Header userEmail={userEmail} onLogout={onLogout} />
        <Main
          activePopup={activePopup}
          selectedCard={selectedCard}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onAddPlaceSubmit={handleAddPlaceSubmit}
          onOpenPopup={handleOpenPopup}
          onClosePopup={handleClosePopup}
          onCardSelect={setSelectedCard} />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;