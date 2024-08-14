const express = require('express');
const { createSuperAdmin, createAdmin } = require('../controllers/superadminController');
const router = express.Router();


router.post('/superadmin', createSuperAdmin);


router.post('/admin', createAdmin);

module.exports = router;
