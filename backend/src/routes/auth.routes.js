const express = require('express');
const router = express.Router();

const {
  register,
  login,
  updateProfile,
  getCurrentUser,
} = require('../controllers/auth.controller');

const authenticateUser = require('../middleware/authentication');
const {
  validateRegisterInput,
  validateLoginInput,
} = require('../middleware/input-validation');

router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);
router.get('/me', authenticateUser, getCurrentUser);

router.patch('/', authenticateUser, updateProfile);

module.exports = router;
