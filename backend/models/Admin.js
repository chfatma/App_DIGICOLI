const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const SuperAdmin = require('./SuperAdmin');
const Client = require('./Client');

const Admin = sequelize.define('Admin', {
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
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  governorate: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  date_naissance: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'admin',
  },
  superadminId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: SuperAdmin,
      key: 'id',
    },
  },
}, {
  timestamps: false,
});

SuperAdmin.hasMany(Admin, { foreignKey: 'superadminId' });
Admin.belongsTo(SuperAdmin, { foreignKey: 'superadminId' });


Admin.hasMany(Client, { foreignKey: 'adminId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Client.belongsTo(Admin, { foreignKey: 'adminId' });

module.exports = Admin;
