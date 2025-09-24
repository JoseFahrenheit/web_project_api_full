import React, { useContext } from 'react';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext.js';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isLiked = Boolean(card.likes?.some(user => user._id === currentUser?._id));
  const cardLikeButtonClassName = `element__vector ${isLiked ? 'element__vector_is-active' : ''}`;

  const isOwner = (
    (card.owner?._id === currentUser?._id) ||
    (card.owner === currentUser?._id)
  );

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onCardDelete(card);
  };

  return (
    <div className="element">
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={() => onCardClick(card)}
      />
      {isOwner && (
        <button
          type="button"
          className="element__delete"
          aria-label="Eliminar tarjeta"
          onClick={handleDeleteClick}
        ></button>
      )}
      <div className="element__footer">
        <p className="element__paragraph">{card.name}</p>
        <div className="element__likes">
          <button
            type="button"
            className={cardLikeButtonClassName}
            aria-label={isLiked ? 'Quitar Like' : 'Dar Like'}
            onClick={handleLikeClick}
          ></button>
          <span className="element__like-counter">{card.likes?.length || 0}</span>
        </div>
      </div>
    </div>
  );
}