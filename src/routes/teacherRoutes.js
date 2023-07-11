const express = require('express');
const { body } = require('express-validator');
const teacherController = require('../controllers/teacherController');
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
  teacherController.registerStudents
);

module.exports = router;
