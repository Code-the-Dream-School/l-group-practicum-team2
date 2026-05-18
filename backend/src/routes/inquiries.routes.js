const express = require('express');
const router = express.Router();

const authenticateUser = require('../middleware/authentication');
const {
  createInquiry,
  getMyInquiries,
} = require('../controllers/inquiries.controller');
const { validateInquiryInput } = require('../validators/input-validation');

router.post('/', authenticateUser, validateInquiryInput, createInquiry);
router.get('/', authenticateUser, getMyInquiries);

module.exports = router;
