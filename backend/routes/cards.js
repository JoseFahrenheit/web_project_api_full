const express = require('express');
const { cardSchema, objectIdSchema } = require('../middleware/validation.js');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const router = express.Router();

router.get('/', getCards);
router.post('/', cardSchema, createCard);
router.delete('/:cardId', objectIdSchema, deleteCard);
router.put('/:cardId/likes', objectIdSchema, likeCard);
router.delete('/:cardId/likes', objectIdSchema, dislikeCard);

module.exports = router;