const express = require('express');
const { createSuperAdmin, createAdmin } = require('../controllers/superadminController');
const router = express.Router();

// Route to create a SuperAdmin
router.post('/superadmin', createSuperAdmin);

// Route to create an Admin
router.post('/admin', createAdmin);

module.exports = router;
