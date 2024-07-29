// models/Pickup.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Admin = require('./adminModel'); // Adjust the path as necessary
const Client = require('./clientModel'); // Adjust the path as necessary

const Pickup = sequelize.define('Pickup', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Client,
      key: 'id',
    },
  },
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
  livreurId: {
    type: DataTypes.INTEGER,
    allowNull: false,
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

// Define associations
Pickup.belongsTo(Client, { foreignKey: 'clientId' });
Pickup.belongsTo(Admin, { foreignKey: 'adminId' });

module.exports = Pickup;
