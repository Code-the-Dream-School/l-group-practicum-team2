const express = require('express');
const router = express.Router();

const { getShelterInfo } = require('../controllers/shelters.controller');

router.get('/:id', getShelterInfo);

module.exports = router;
