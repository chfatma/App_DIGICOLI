const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to fetch user data by ID
router.get('/:id', userController.getUserById);

// Route to update user data by ID
router.put('/:id', userController.updateUserById);

module.exports = router;
