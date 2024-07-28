const db = require('../config/db'); // Adjust the path to your database connection module

const getAllAdmins = (callback) => {
  db.query('SELECT * FROM users WHERE role = ?', ['admin'], callback);
};

const getAdminById = (id, callback) => {
  db.query('SELECT * FROM users WHERE id = ? AND role = ?', [id, 'admin'], callback);
};

const createAdmin = (admin, callback) => {
  const { email, first_name, last_name, password, phone, address, governorate, date_naissance } = admin;
  const query = 'INSERT INTO users (email, first_name, last_name, password, phone, address, governorate, date_naissance, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [email, first_name, last_name, password, phone, address, governorate, date_naissance, 'admin'];
  db.query(query, values, callback);
};

const updateAdmin = (id, admin, callback) => {
  const { email, first_name, last_name, password, phone, address, governorate, date_naissance } = admin;
  const query = 'UPDATE users SET email = ?, first_name = ?, last_name = ?, password = ?, phone = ?, address = ?, governorate = ?, date_naissance = ? WHERE id = ? AND role = ?';
  const values = [email, first_name, last_name, password, phone, address, governorate, date_naissance, id, 'admin'];
  db.query(query, values, callback);
};

const deleteAdmin = (id, callback) => {
  db.query('DELETE FROM users WHERE id = ? AND role = ?', [id, 'admin'], callback);
};

module.exports = {
  getAllAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin
};
