const express = require('express');
const router = express.Router();

const authenticateUser = require('../middleware/authentication');
const {
  createInquiry,
  getMyInquiries,
} = require('../controllers/inquiries.controller');

router.post('/', authenticateUser, createInquiry);
router.get('/', authenticateUser, getMyInquiries);

module.exports = router;
