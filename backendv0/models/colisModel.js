// models/Colis.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Admin = require('../models/adminModel');

const Colis = sequelize.define('Colis', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expediteur: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destinataire: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[0-9]{10,15}$/, // adjust regex according to your phone number format
    },
  },
  montant: {
    type: DataTypes.DECIMAL(10, 2), // assuming it's a monetary amount
    allowNull: false,
  },
  depot: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adresse: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  statut: {
    type: DataTypes.ENUM('livrais', 'en attente', 'en cours'),
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
Colis.belongsTo(Admin, { foreignKey: 'adminId' });

module.exports = Colis;
