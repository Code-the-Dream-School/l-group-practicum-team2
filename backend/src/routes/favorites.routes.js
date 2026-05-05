const express = require('express');
const router = express.Router();

const verifyToken = require('...middleware/verifyToken');

const {
    createFavorite,
    getFavorite,
    removeFavorite,
} = require('../controllers/favorites.controller');

router.post('/', verifyToken, createFavorite);
router.post('/', verifyToken, getFavorite);
router.delet ('/:animalId', verifyToken, removeFavorite);

module.exports = router;