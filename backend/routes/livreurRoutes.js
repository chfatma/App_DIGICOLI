// routes/livreurRoutes.js
const express = require('express');
const router = express.Router();
const { createLivreur, getAllLivreurs, getLivreurById, updateLivreur, deleteLivreur } = require('../controllers/livreurController');

// Route to create a livreur
router.post('/create', createLivreur);

// Route to get all livreurs by adminId (from query parameters)
router.get('/', getAllLivreurs);

// Route to get a livreur by ID
router.get('/:id', getLivreurById);

// Route to update a livreur
router.put('/:id', updateLivreur);

// Route to delete a livreur
router.delete('/:id', deleteLivreur);



module.exports = router;
