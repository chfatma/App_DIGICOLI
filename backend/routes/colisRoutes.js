const express = require('express');
const router = express.Router();
const colisController = require('../controllers/colisController');

router.post('/', colisController.createColis);

router.get('/', colisController.getAllColis);

router.get('/:id', colisController.getColisById);

router.put('/:id', colisController.updateColis);

router.delete('/:id', colisController.deleteColis);

module.exports = router;
