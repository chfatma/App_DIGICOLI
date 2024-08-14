// models/colis.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Admin = require('./Admin');
const Livreur = require('./Livreur');

const Colis = sequelize.define('Colis', {
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
      is: /^[0-9]{8,15}$/,
    },
  },
  montant: {
    type: DataTypes.DECIMAL(10, 2),
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
  suiviEmplacement: {
    type: DataTypes.STRING,  // Or DataTypes.TEXT if the data might be long
    allowNull: true, // Set to true to allow NULL values, or false if it’s mandatory
  },
  adminId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Admin,
      key: 'id',
    },
  },
  livreurId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Livreur,
      key: 'id',
    },
  },
});

Colis.belongsTo(Admin, { foreignKey: 'adminId' });
Colis.belongsTo(Livreur, { foreignKey: 'livreurId' });

module.exports = Colis;
