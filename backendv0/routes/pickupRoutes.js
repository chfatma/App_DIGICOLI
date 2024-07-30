// routes/pickupRoutes.js
const express = require('express');
const pickupController = require('../controllers/pickupController');

const router = express.Router();

router.get('/', pickupController.getAllPickups);
router.post('/', pickupController.createPickup);

module.exports = router;
