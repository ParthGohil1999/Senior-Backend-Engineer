const express = require('express');
const authRoutes = require('./authRoutes');
const teacherRoutes = require('./teacherRoutes');
const studentRoutes = require('./studentRoutes');
const notificationRoutes = require('./notificationRoutes');

const router = express.Router();

router.use('/api', authRoutes);
router.use('/api', teacherRoutes);
router.use('/api', studentRoutes);
router.use('/api', notificationRoutes);

module.exports = router;
