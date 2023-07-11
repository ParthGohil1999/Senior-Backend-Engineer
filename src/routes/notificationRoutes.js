const express = require('express');
const { body } = require('express-validator');
const notificationController = require('../controllers/notificationController');
const { validateRequest } = require('../middleware/validationMiddleware');

const router = express.Router();

router.post(
  '/retrievefornotifications',
  [
    body('teacher').isEmail().normalizeEmail().withMessage('Invalid teacher email'),
    body('notification').notEmpty().withMessage('Notification is required'),
  ],
  validateRequest,
  notificationController.retrieveRecipients
);

module.exports = router;
