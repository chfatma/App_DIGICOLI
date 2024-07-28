// routes/clientRoutes.js
const express = require('express');
const router = express.Router();
const clients = require('../controllers/clientController');

router.post('/', clients.create);
router.get('/', clients.findAll);
router.get('/:clientId', clients.findOne);
router.put('/:clientId', clients.update);
router.delete('/:clientId', clients.delete);

module.exports = router;
