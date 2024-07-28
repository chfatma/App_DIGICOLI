// routes/pickupRoutes.js
const express = require('express');
const router = express.Router();
const PickupController = require('../controllers/pickupController');

// Define routes and use the controller methods
router.post('/pickups', PickupController.create);
router.get('/pickups', PickupController.getAll);

module.exports = router;
