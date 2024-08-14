const express = require('express');
const router = express.Router();
const { createLivreur, getAllLivreurs, getLivreurById, updateLivreur, deleteLivreur } = require('../controllers/livreurController');


router.post('/create', createLivreur);


router.get('/', getAllLivreurs);

router.get('/:id', getLivreurById);


router.put('/:id', updateLivreur);


router.delete('/:id', deleteLivreur);

module.exports = router;
