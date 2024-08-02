// controllers/ClientController.js
const Client = require('../models/Client');

// Create a new client
exports.createClient = async (req, res) => {
  try {
    const { adminId, email, nom, prenom, motdepasse, telephone, address, governorate, date_naissance, colisALivrer } = req.body;
    
    // Ensure adminId is provided
    if (!adminId) {
      return res.status(400).json({ message: 'adminId is required' });
    }
    
    const newClient = await Client.create({
      adminId,
      email,
      nom,
      prenom,
      motdepasse,
      telephone,
      address,
      governorate,
      date_naissance,
      colisALivrer,
    });
    res.status(201).json(newClient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all clients created by a specific admin
exports.getAllClients = async (req, res) => {
  try {
    const adminId = req.query.adminId;

    if (!adminId) {
      return res.status(400).json({ message: 'adminId is required' });
    }

    const clients = await Client.findAll({ where: { adminId } });
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a client by ID and adminId
exports.getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminId } = req.query;

    if (!adminId) {
      return res.status(400).json({ message: 'adminId is required' });
    }

    const client = await Client.findOne({ where: { id, adminId } });

    if (!client) {
      return res.status(404).json({ message: 'Client not found or not authorized' });
    }
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a client by ID
exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminId } = req.body;

    if (!adminId) {
      return res.status(400).json({ message: 'adminId is required' });
    }

    const [updated] = await Client.update(req.body, {
      where: { id, adminId }
    });

    if (!updated) {
      return res.status(404).json({ message: 'Client not found or not authorized' });
    }
    res.status(200).json({ message: 'Client updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a client by ID
exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminId } = req.query;

    if (!adminId) {
      return res.status(400).json({ message: 'adminId is required' });
    }

    const deleted = await Client.destroy({
      where: { id, adminId }
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Client not found or not authorized' });
    }
    res.status(200).json({ message: 'Client deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Update a client by ID
exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminId } = req.body;

    if (!adminId) {
      return res.status(400).json({ message: 'adminId is required' });
    }

    const [updated] = await Client.update(req.body, {
      where: { id, adminId }
    });

    if (!updated) {
      return res.status(404).json({ message: 'Client not found or not authorized' });
    }
    res.status(200).json({ message: 'Client updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
