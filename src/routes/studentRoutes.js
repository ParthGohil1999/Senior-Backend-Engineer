const express = require('express');
const { body } = require('express-validator');
const studentController = require('../controllers/studentController');
const { validateRequest } = require('../middleware/validationMiddleware');

const router = express.Router();

router.post(
  '/suspend',
  [body('student').isEmail().normalizeEmail().withMessage('Invalid student email')],
  validateRequest,
  studentController.suspendStudent
);

module.exports = router;
