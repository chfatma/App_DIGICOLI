const express = require('express');
const router = express.Router();
const colisController = require('../controllers/colisController');


router.get('/', colisController.getAllColis);


router.get('/:id', colisController.getColisById);

router.get('/livreur/:livreurId', colisController.getColisByLivreurId);


router.post('/', colisController.createColis);


router.put('/:id', colisController.updateColis);


router.delete('/:id', colisController.deleteColis);


router.get('/admin/colis', colisController.getAllColisByadmin);


router.get('/admin/depot/count', colisController.getColisCountByAdminIdAndDepot);


router.get('/code/:code', colisController.getColisByCode); 


module.exports = router;
