// models/clientModel.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Admin = require('./adminModel'); // Adjust the path as necessary

const Client = sequelize.define('Client', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
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
      is: /^[0-9]{10,15}$/, // Adjust regex according to your phone number format
    },
  },
  address: {
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
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  colisALivrer: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  adminId: {
    type: DataTypes.INTEGER,
    references: {
      model: Admin, // Reference to the Admin model
      key: 'id',
    },
    allowNull: false,
  },
});

// Define associations
Client.belongsTo(Admin, { foreignKey: 'adminId' });

module.exports = Client;
