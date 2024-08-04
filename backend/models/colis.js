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
        is: /^[0-9]{8,15}$/
 // adjust regex according to your phone number format
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
      allowNull: false,
      references: {
        model: Admin,
        key: 'id'
      }
    },
    livreurId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Livreur,
        key: 'id'
      }
    },

  });

  Colis.belongsTo(Admin, { foreignKey: 'adminId' });
  Colis.belongsTo(Livreur, { foreignKey: 'livreurId' });


  module.exports = Colis;
