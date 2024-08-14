const Admin = require('../models/Admin');

// List all admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.json(admins);
  } catch (error) {
    console.error('Error fetching admins:', error);
    res.status(500).json({ message: 'Error fetching admins', error: error.message });
  }
};

// Get all admins for a specific superadmin
exports.getAdminsBySuperadmin = async (req, res) => {
  const { superadminId } = req.params;
  if (!superadminId) {
    return res.status(400).json({ message: 'Superadmin ID is required' });
  }
  try {
    const admins = await Admin.findAll({ where: { superadminId } });
    res.json(admins);
  } catch (error) {
    console.error('Error fetching admins by superadmin:', error);
    res.status(500).json({ message: 'Error fetching admins', error: error.message });
  }
};

// Get an admin by ID
exports.getAdminById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'Admin ID is required' });
  }
  try {
    const admin = await Admin.findByPk(id);
    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    console.error('Error fetching admin by ID:', error);
    res.status(500).json({ message: 'Error fetching admin', error: error.message });
  }
};

// Create a new admin
exports.createAdmin = async (req, res) => {
  try {
    const admin = await Admin.create(req.body);
    res.status(201).json(admin);
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ message: 'Error creating admin', error: error.message });
  }
};

// Update an admin by ID
exports.updateAdminById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'Admin ID is required' });
  }
  try {
    const [updated] = await Admin.update(req.body, {
      where: { id }
    });
    if (updated) {
      const updatedAdmin = await Admin.findByPk(id);
      res.json(updatedAdmin);
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    console.error('Error updating admin by ID:', error);
    res.status(500).json({ message: 'Error updating admin', error: error.message });
  }
};

// Delete an admin by ID
exports.deleteAdminById = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'Admin ID is required' });
  }
  try {
    const deleted = await Admin.destroy({
      where: { id }
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    console.error('Error deleting admin by ID:', error);
    res.status(500).json({ message: 'Error deleting admin', error: error.message });
  }
};
