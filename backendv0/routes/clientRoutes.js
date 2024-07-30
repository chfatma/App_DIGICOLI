const express = require('express');
const clientController = require('../controllers/clientController'); // Ensure this path is correct

const router = express.Router();

// Define routes with matching controller function names
router.post('/post/add', clientController.createClient);  // Updated to match controller method name
router.get('/all/', clientController.getAllClients);      // Updated to match controller method name
router.get('/get/:id', clientController.getClientById);   // Updated to match controller method name
router.put('/update/:id', clientController.updateClient); // Updated to match controller method name
router.delete('/kill/:id', clientController.deleteClient); // Updated to match controller method name

module.exports = router;
