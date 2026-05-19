const express = require('express');
const router = express.Router();

const {
    register,
    login,
    updateProfile,
    deleteAccount,
    getCurrentUser
} = require('../controllers/auth.controller');

const authenticateUser = require('../middleware/authentication');
const {
  validateRegisterInput,
  validateLoginInput,
} = require('../validators/input-validation');

router.post('/register', validateRegisterInput, register);
router.post('/login', validateLoginInput, login);
router.get('/me', authenticateUser, getCurrentUser);

router.get('/me', authenticateUser, getCurrentUser);
router.patch('/', authenticateUser, updateProfile);

router.delete('/', authenticateUser, deleteAccount);

module.exports = router;