// routes/colisRoutes.js
const express = require('express');
const colisController = require('../controllers/colisController');

const router = express.Router();

router.get('/', colisController.getAllColis);
router.get('/:id', colisController.getColisById);
router.post('/', colisController.createColis);
router.put('/:id', colisController.updateColis);
router.delete('/:id', colisController.deleteColis);

module.exports = router;
