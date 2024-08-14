const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');


router.get('/', adminController.getAllAdmins);


router.get('/:id', adminController.getAdminById);


router.post('/', adminController.createAdmin);


router.put('/:id', adminController.updateAdminById);


router.delete('/:id', adminController.deleteAdminById);


router.get('/superadmin/:superadminId', adminController.getAdminsBySuperadmin);

module.exports = router;
