const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Route to get all admins
router.get('/', adminController.getAllAdmins);

// Route to get an admin by ID
router.get('/:id', adminController.getAdminById);

// Route to create a new admin
router.post('/', adminController.createAdmin);

// Route to update an admin by ID
router.put('/:id', adminController.updateAdminById);

// Route to delete an admin by ID
router.delete('/:id', adminController.deleteAdminById);

// Route to get all admins by superadmin ID
router.get('/superadmin/:superadminId', adminController.getAdminsBySuperadmin);

module.exports = router;
