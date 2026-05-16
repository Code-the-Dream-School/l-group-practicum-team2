const express = require('express');
const router = express.Router();

const {
  getAnimals,
  getAnimalDetails,
} = require('../controllers/animals.controller');

// GET /api/animals/:id
router.get('/:id', getAnimalDetails);

router.get('/', getAnimals);

module.exports = router;
