const express = require('express');
const router = express.Router();

const authenticateUser = require('../middleware/authentication');
const { validateFavoriteInput } = require('../validators/input-validation');

const {
  createFavorite,
  getFavorites,
  removeFavorite,
} = require('../controllers/favorites.controller');

router.post('/', authenticateUser, validateFavoriteInput, createFavorite);
router.get('/', authenticateUser, getFavorites);
router.delete('/:animalId', authenticateUser, removeFavorite);

module.exports = router;
