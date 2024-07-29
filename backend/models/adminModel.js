// models/Admin.js
const { DataTypes } = require("sequelize");
const { sequelize } = require('../config/database');

const Admin = sequelize.define("Admin", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[0-9]{10,15}$/, // adjust regex according to your phone number format
    },
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  governorate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_naissance: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Admin;

// const db = require('../config/db'); // Adjust the path to your database connection module

// const getAllAdmins = (callback) => {
//   db.query('SELECT * FROM users WHERE role = ?', ['admin'], callback);
// };

// const getAdminById = (id, callback) => {
//   db.query('SELECT * FROM users WHERE id = ? AND role = ?', [id, 'admin'], callback);
// };

// const createAdmin = (admin, callback) => {
//   const { email, first_name, last_name, password, phone, address, governorate, date_naissance } = admin;
//   const query = 'INSERT INTO users (email, first_name, last_name, password, phone, address, governorate, date_naissance, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
//   const values = [email, first_name, last_name, password, phone, address, governorate, date_naissance, 'admin'];
//   db.query(query, values, callback);
// };

// const updateAdmin = (id, admin, callback) => {
//   const { email, first_name, last_name, password, phone, address, governorate, date_naissance } = admin;
//   const query = 'UPDATE users SET email = ?, first_name = ?, last_name = ?, password = ?, phone = ?, address = ?, governorate = ?, date_naissance = ? WHERE id = ? AND role = ?';
//   const values = [email, first_name, last_name, password, phone, address, governorate, date_naissance, id, 'admin'];
//   db.query(query, values, callback);
// };

// const deleteAdmin = (id, callback) => {
//   db.query('DELETE FROM users WHERE id = ? AND role = ?', [id, 'admin'], callback);
// };

// module.exports = {
//   getAllAdmins,
//   getAdminById,
//   createAdmin,
//   updateAdmin,
//   deleteAdmin
// };
