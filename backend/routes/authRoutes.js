const express = require('express');
const   router = express.Router();
const { loginUser, logoutUser,  updateUserProfile } = require('../controllers/authController');


router.post('/login', loginUser);


router.post('/logout', logoutUser);


router.put('/profile', updateUserProfile);



module.exports = router;