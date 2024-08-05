const Pickup = require('../models/pickup');
const Admin = require('../models/Admin');
const Client = require('../models/Client');
const Livreur = require('../models/Livreur');

// Get all pickups
const getAllPickups = async (req, res) => {
  try {
    const pickups = await Pickup.findAll();
    res.json(pickups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get pickup by ID
const getPickupById = async (req, res) => {
  const { id } = req.params;
  try {
    const pickup = await Pickup.findByPk(id);
    if (pickup) {
      res.json(pickup);
    } else {
      res.status(404).json({ error: 'Pickup not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new pickup
const createPickup = async (req, res) => {
  const { clientId, date, totalColis, distribution, livreurId, adminId } = req.body;
  try {
    const admin = await Admin.findByPk(adminId);
    if (!admin) return res.status(400).json({ error: 'Invalid adminId' });

    const client = await Client.findByPk(clientId);
    if (!client) return res.status(400).json({ error: 'Invalid clientId' });

    const livreur = await Livreur.findByPk(livreurId);
    if (!livreur) return res.status(400).json({ error: 'Invalid livreurId' });

    const newPickup = await Pickup.create({ clientId, date, totalColis, distribution, livreurId, adminId });
    res.status(201).json({ message: 'Pickup created successfully', pickup: newPickup });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a pickup by ID
const updatePickup = async (req, res) => {
  const { id } = req.params;
  const { clientId, date, totalColis, distribution, livreurId, adminId } = req.body;
  try {
    const pickup = await Pickup.findByPk(id);
    if (!pickup) return res.status(404).json({ error: 'Pickup not found' });

    if (adminId) {
      const admin = await Admin.findByPk(adminId);
      if (!admin) return res.status(400).json({ error: 'Invalid adminId' });
    }

    if (clientId) {
      const client = await Client.findByPk(clientId);
      if (!client) return res.status(400).json({ error: 'Invalid clientId' });
    }

    if (livreurId) {
      const livreur = await Livreur.findByPk(livreurId);
      if (!livreur) return res.status(400).json({ error: 'Invalid livreurId' });
    }

    pickup.clientId = clientId || pickup.clientId;
    pickup.date = date || pickup.date;
    pickup.totalColis = totalColis || pickup.totalColis;
    pickup.distribution = distribution || pickup.distribution;
    pickup.livreurId = livreurId || pickup.livreurId;
    pickup.adminId = adminId || pickup.adminId;

    await pickup.save();
    res.json({ message: 'Pickup updated successfully', pickup });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a pickup by ID
const deletePickup = async (req, res) => {
  const { id } = req.params;
  try {
    const pickup = await Pickup.findByPk(id);
    if (!pickup) return res.status(404).json({ error: 'Pickup not found' });

    await pickup.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get pickups by adminId
const getPickupsByAdminId = async (req, res) => {
  const { adminId } = req.query; // Get adminId from query parameters
  try {
    if (!adminId) {
      return res.status(400).json({ error: 'Admin ID is required' });
    }
    const pickups = await Pickup.findAll({ where: { adminId } });
    if (pickups.length > 0) {
      res.json(pickups);
    } else {
      res.status(404).json({ error: 'No pickups found for this admin' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllPickups,
  getPickupById,
  createPickup,
  updatePickup,
  deletePickup,
  getPickupsByAdminId
};
