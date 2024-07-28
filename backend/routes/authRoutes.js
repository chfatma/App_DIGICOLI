const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Define the route for login
router.post('/login', authController.login);

module.exports = router;
