// controllers/adminController.js
const Admin = require('../models/adminModel');

// Get all admins
exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admins', error });
  }
};

// Get admin by ID
exports.getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findByPk(id);

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admin', error });
  }
};

// Create a new admin
exports.createAdmin = async (req, res) => {
  try {
    const { email, first_name, last_name, password, phone, address, role, governorate, date_naissance } = req.body;

    // Create a new admin
    const newAdmin = await Admin.create({
      email,
      first_name,
      last_name,
      password,
      phone,
      address,
      role,
      governorate,
      date_naissance,
    });

    res.status(201).json({ message: 'Admin created successfully', admin: newAdmin });
  } catch (error) {
    res.status(500).json({ message: 'Error creating admin', error });
  }
};

// Update an existing admin
exports.updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, first_name, last_name, password, phone, address, role, governorate, date_naissance } = req.body;

    const admin = await Admin.findByPk(id);

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Update the admin details
    admin.email = email;
    admin.first_name = first_name;
    admin.last_name = last_name;
    admin.password = password;
    admin.phone = phone;
    admin.address = address;
    admin.role = role;
    admin.governorate = governorate;
    admin.date_naissance = date_naissance;

    await admin.save();

    res.status(200).json({ message: 'Admin updated successfully', admin });
  } catch (error) {
    res.status(500).json({ message: 'Error updating admin', error });
  }
};

// Delete an admin
exports.deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await Admin.findByPk(id);

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    await admin.destroy();

    res.status(200).json({ message: 'Admin deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting admin', error });
  }
};
