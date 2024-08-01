const Admin = require('../models/Admin');

// Get all admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admins', error });
  }
};

// Get all admins for a specific superadmin
exports.getAdminsBySuperadmin = async (req, res) => {
  try {
    const { superadminId } = req.params;
    const admins = await Admin.findAll({ where: { superadminId } });
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admins', error });
  }
};


// Get an admin by ID
exports.getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admin', error });
  }
};

// Create a new admin
exports.createAdmin = async (req, res) => {
  try {
    const admin = await Admin.create(req.body);
    res.status(201).json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Error creating admin', error });
  }
};

// Update an admin by ID
exports.updateAdminById = async (req, res) => {
  try {
    const [updated] = await Admin.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedAdmin = await Admin.findByPk(req.params.id);
      res.json(updatedAdmin);
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating admin', error });
  }
};

// Delete an admin by ID
exports.deleteAdminById = async (req, res) => {
  try {
    const deleted = await Admin.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting admin', error });
  }
};
