// controllers/pickupController.js
const Pickup = require('../models/pickupModel');
const Admin = require('../models/adminModel'); // Adjust the path as necessary
const Client = require('../models/clientModel'); // Adjust the path as necessary

// Get all pickups
exports.getAllPickups = async (req, res) => {
  try {
    const pickups = await Pickup.findAll();
    res.status(200).json(pickups);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pickups', error });
  }
};

// Create a new pickup
exports.createPickup = async (req, res) => {
  try {
    const { clientId, date, totalColis, distribution, livreurId, adminId } = req.body;

    // Validate if the admin exists
    const admin = await Admin.findByPk(adminId);
    if (!admin) {
      return res.status(400).json({ message: 'Invalid adminId' });
    }

    // Validate if the client exists
    const client = await Client.findByPk(clientId);
    if (!client) {
      return res.status(400).json({ message: 'Invalid clientId' });
    }

    // Create a new pickup
    const newPickup = await Pickup.create({
      clientId,
      date,
      totalColis,
      distribution,
      livreurId,
      adminId,
    });

    res.status(201).json({ message: 'Pickup created successfully', pickup: newPickup });
  } catch (error) {
    res.status(500).json({ message: 'Error creating pickup', error });
  }
};

// Update an existing pickup
exports.updatePickup = async (req, res) => {
  try {
    const { id } = req.params;
    const { clientId, date, totalColis, distribution, livreurId, adminId } = req.body;

    const pickup = await Pickup.findByPk(id);

    if (!pickup) {
      return res.status(404).json({ message: 'Pickup not found' });
    }

    // Validate if the admin exists
    if (adminId) {
      const admin = await Admin.findByPk(adminId);
      if (!admin) {
        return res.status(400).json({ message: 'Invalid adminId' });
      }
    }

    // Validate if the client exists
    if (clientId) {
      const client = await Client.findByPk(clientId);
      if (!client) {
        return res.status(400).json({ message: 'Invalid clientId' });
      }
    }

    // Update the pickup details
    pickup.clientId = clientId || pickup.clientId;
    pickup.date = date || pickup.date;
    pickup.totalColis = totalColis || pickup.totalColis;
    pickup.distribution = distribution || pickup.distribution;
    pickup.livreurId = livreurId || pickup.livreurId;
    pickup.adminId = adminId || pickup.adminId;

    await pickup.save();

    res.status(200).json({ message: 'Pickup updated successfully', pickup });
  } catch (error) {
    res.status(500).json({ message: 'Error updating pickup', error });
  }
};

// Delete a pickup
exports.deletePickup = async (req, res) => {
  try {
    const { id } = req.params;

    const pickup = await Pickup.findByPk(id);

    if (!pickup) {
      return res.status(404).json({ message: 'Pickup not found' });
    }

    await pickup.destroy();

    res.status(200).json({ message: 'Pickup deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting pickup', error });
  }
};
