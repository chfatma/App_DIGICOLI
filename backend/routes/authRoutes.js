const express = require('express');
const   router = express.Router();
const { loginUser, logoutUser } = require('../controllers/authController'); // Update this path based on your authController file

// Login Route
router.post('/login', loginUser);

// Logout Route
router.post('/logout', logoutUser);

module.exports = router;
