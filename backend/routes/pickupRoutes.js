const express = require('express');
const router = express.Router();
const pickupController = require('../controllers/pickupController');

router.get('/', pickupController.getAllPickups);
router.post('/', pickupController.createPickup);
router.put('/:id', pickupController.updatePickup);
router.delete('/:id', pickupController.deletePickup);
router.get('/admin/pickup', pickupController.getPickupsByAdminId);

module.exports = router;