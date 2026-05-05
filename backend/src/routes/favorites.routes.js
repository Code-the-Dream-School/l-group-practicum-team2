const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/verifyToken');

const {
    createFavorite,
    getFavorites,
    removeFavorite,
} = require('../controllers/favorites.controller');

router.post('/', verifyToken, createFavorite);
router.get('/', verifyToken, getFavorites);
router.delete ('/:animalId', verifyToken, removeFavorite);

module.exports = router;