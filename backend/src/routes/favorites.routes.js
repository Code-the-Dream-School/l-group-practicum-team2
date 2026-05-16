const express = require('express');
const router = express.Router();

const authenticateUser = require('../middleware/authentication');

const {
  createFavorite,
  getFavorites,
  removeFavorite,
} = require('../controllers/favorites.controller');

router.post('/', authenticateUser, createFavorite);
router.get('/', authenticateUser, getFavorites);
router.delete('/:animalId', authenticateUser, removeFavorite);

module.exports = router;
