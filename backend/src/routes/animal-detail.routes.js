const express = require('express');
const router = express.Router();

const { getAnimalDetails } = require('../controllers/animal-detail.controller');

// GET /api/animals/:id
router.get('/:id', getAnimalDetails);

module.exports = router;