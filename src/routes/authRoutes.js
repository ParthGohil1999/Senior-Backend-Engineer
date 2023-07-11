const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { validateRequest } = require('../middleware/validationMiddleware');

const router = express.Router();

router.post(
  '/register',
  [
    body('teacher').isEmail().normalizeEmail().withMessage('Invalid teacher email'),
    body('students').isArray().withMessage('Students must be an array'),
    body('students.*').isEmail().normalizeEmail().withMessage('Invalid student email'),
  ],
  validateRequest,
  authController.registerStudents
);

router.get(
  '/commonstudents',
  [
    body('teacher').isArray().withMessage('Teacher must be an array'),
    body('teacher.*').isEmail().normalizeEmail().withMessage('Invalid teacher email'),
  ],
  validateRequest,
  authController.getCommonStudents
);

module.exports = router;
