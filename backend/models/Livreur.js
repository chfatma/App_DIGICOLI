
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Admin = require('./Admin'); 

const Livreur = sequelize.define('Livreur', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  motdepasse: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: false,
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
    defaultValue: 'livreur',
  },
  adminId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Admins',
      key: 'id',
    },
    
  },
}, );

module.exports = Livreur;
