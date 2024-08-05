// models/pickup.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Admin = require('./Admin');
const Client = require('./Client');
const Livreur = require('./Livreur');

const Pickup = sequelize.define('Pickup', {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  totalColis: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  distribution: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Client,
      key: 'id',
    },
  },
  livreurId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Livreur,
      key: 'id',
    },
  },
  adminId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Admin,
      key: 'id',
    },
  },
});

Pickup.belongsTo(Client, { foreignKey: 'clientId' });
Pickup.belongsTo(Livreur, { foreignKey: 'livreurId' });
Pickup.belongsTo(Admin, { foreignKey: 'adminId' });

module.exports = Pickup;
