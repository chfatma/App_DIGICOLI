const express = require('express');
const router = express.Router();
const clientController = require('../controllers/ClientController');

// Route to create a new client (adminId must be included in the request body)
router.post('/', clientController.createClient);

// Route to get all clients created by the specified admin (adminId must be included in the query string)
router.get('/', clientController.getAllClients);

// Route to get a client by ID and adminId (adminId must be included in the query string)
router.get('/:id', clientController.getClientById);


// Route to update a client by ID (adminId must be included in the request body)
router.put('/:id', clientController.updateClient);

// Route to delete a client by ID (adminId must be included in the query string)
router.delete('/:id', clientController.deleteClient);

module.exports = router;
