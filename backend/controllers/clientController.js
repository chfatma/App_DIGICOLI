// controllers/clientController.js
const Client = require('../models/clientModel');
const Admin = require('../models/adminModel'); // Adjust the path as necessary

// Get all clients
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.status(200).json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching clients', error });
  }
};

// Get client by ID
exports.getClientById = async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching client', error });
  }
};

// Create a new client
exports.createClient = async (req, res) => {
  try {
    const { email, first_name, last_name, password, phone, address, governorate, date_naissance, role, colisALivrer, adminId } = req.body;

    // Validate if the admin exists
    const admin = await Admin.findByPk(adminId);
    if (!admin) {
      return res.status(400).json({ message: 'Invalid adminId' });
    }

    // Create a new client
    const newClient = await Client.create({
      email,
      first_name,
      last_name,
      password,
      phone,
      address,
      governorate,
      date_naissance,
      role,
      colisALivrer,
      adminId,
    });

    res.status(201).json({ message: 'Client created successfully', client: newClient });
  } catch (error) {
    res.status(500).json({ message: 'Error creating client', error });
  }
};

// Update an existing client
exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, first_name, last_name, password, phone, address, governorate, date_naissance, role, colisALivrer, adminId } = req.body;

    const client = await Client.findByPk(id);

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // Validate if the admin exists
    if (adminId) {
      const admin = await Admin.findByPk(adminId);
      if (!admin) {
        return res.status(400).json({ message: 'Invalid adminId' });
      }
    }

    // Update the client details
    client.email = email;
    client.first_name = first_name;
    client.last_name = last_name;
    client.password = password;
    client.phone = phone;
    client.address = address;
    client.governorate = governorate;
    client.date_naissance = date_naissance;
    client.role = role;
    client.colisALivrer = colisALivrer;
    if (adminId) client.adminId = adminId;

    await client.save();

    res.status(200).json({ message: 'Client updated successfully', client });
  } catch (error) {
    res.status(500).json({ message: 'Error updating client', error });
  }
};

// Delete a client
exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;

    const client = await Client.findByPk(id);

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    await client.destroy();

    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting client', error });
  }
};
