const adminModel = require('../models/adminModel');

const getAllAdmins = (req, res) => {
  adminModel.getAllAdmins((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

const getAdminById = (req, res) => {
  const { id } = req.params;
  adminModel.getAdminById(id, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json(results[0]);
  });
};

const createAdmin = (req, res) => {
  const newAdmin = req.body;
  adminModel.createAdmin(newAdmin, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId, ...newAdmin });
  });
};

const updateAdmin = (req, res) => {
  const { id } = req.params;
  const updatedAdmin = req.body;
  adminModel.updateAdmin(id, updatedAdmin, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Admin not found or not updated' });
    }
    res.json({ message: 'Admin updated successfully' });
  });
};

const deleteAdmin = (req, res) => {
  const { id } = req.params;
  adminModel.deleteAdmin(id, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json({ message: 'Admin deleted successfully' });
  });
};

module.exports = {
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin
};
