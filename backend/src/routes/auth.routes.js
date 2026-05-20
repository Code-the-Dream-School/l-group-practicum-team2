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
} = require('../validators/input-validation');

const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    error: 'Too many login or registration attempts. Please try again later.',
  },
});

router.post('/register', authLimiter, validateRegisterInput, register);
router.post('/login', authLimiter, validateLoginInput, login);

router.get('/me', authenticateUser, getCurrentUser);
router.patch('/', authenticateUser, updateProfile);

module.exports = router;
