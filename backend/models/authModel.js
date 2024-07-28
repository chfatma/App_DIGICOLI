// models/AuthModel.js
const db = require('../config/db');

const AuthModel = {
  findUserByEmail: (email, callback) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    db.query(sql, [email], (err, result) => {
      if (err) callback(err, null);
      else callback(null, result[0]);
    });
  },

  findClientByEmail: (email, callback) => {
    const sql = 'SELECT * FROM clients WHERE email = ?';
    db.query(sql, [email], (err, result) => {
      if (err) callback(err, null);
      else callback(null, result[0]);
    });
  },

  createUser: (userData, callback) => {
    const sql = 'INSERT INTO users (email, first_name, last_name, password, phone, address, governorate, role, date_naissance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [
      userData.email,
      userData.first_name,
      userData.last_name,
      userData.password,
      userData.phone,
      userData.address,
      userData.governorate,
      userData.role,
      userData.date_naissance,
    ], (err, result) => {
      if (err) callback(err, null);
      else callback(null, result.insertId);
    });
  },

  createClient: (clientData, callback) => {
    const sql = 'INSERT INTO clients (email, first_name, last_name, password, phone, address, governorate, role, date_naissance, colisALivrer) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [
      clientData.email,
      clientData.first_name,
      clientData.last_name,
      clientData.password,
      clientData.phone,
      clientData.address,
      clientData.governorate,
      clientData.role,
      clientData.date_naissance,
      clientData.colisALivrer
    ], (err, result) => {
      if (err) callback(err, null);
      else callback(null, result.insertId);
    });
  },
};

module.exports = AuthModel;
