const express = require('express');
const router = express.Router();
const colisController = require('../controllers/colisController');

// Get all colis
router.get('/', colisController.getAllColis);

// Get colis by ID
router.get('/:id', colisController.getColisById);

// Get all colis for a specific livreur
router.get('/livreur/:livreurId', colisController.getColisByLivreurId);

// Create a new colis
router.post('/', colisController.createColis);

// Update a colis by ID
router.put('/:id', colisController.updateColis);

// Delete a colis by ID
router.delete('/:id', colisController.deleteColis);

// Get all colis (optionally filtered by adminId)
router.get('/admin/colis', colisController.getAllColisByadmin);

// Get total count of colis for a specific admin and depot
router.get('/admin/depot/count', colisController.getColisCountByAdminIdAndDepot);


module.exports = router;
