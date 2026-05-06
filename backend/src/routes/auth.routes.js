const express = require('express');
const router = express.Router();

const { register, login, updateProfile } = require('../controllers/auth.controller');
const auth = require('../middleware/authentication');

router.post('/register', register);
router.post('/login', login);
router.patch('/', auth, updateProfile);

module.exports = router;