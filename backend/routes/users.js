const express = require('express');
const { userUpdateSchema, avatarUpdateSchema, objectIdSchema } = require('../middleware/validation.js');
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getCurrentUser
} = require('../controllers/users');

const router = express.Router();

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', objectIdSchema, getUserById);
router.patch('/me', userUpdateSchema, updateProfile);
router.patch('/me/avatar', avatarUpdateSchema, updateAvatar);

module.exports = router;