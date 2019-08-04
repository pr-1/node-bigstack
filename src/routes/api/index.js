const express = require('express');
const authRoutes = require('./auth');
const profileRoutes = require('./profile');
const questionsRoutes = require('./questions');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/questions', questionsRoutes);
router.use('/profile', profileRoutes);

module.exports = router;