const sequelize = require('../config/db');
const SuperAdmin = require('./SuperAdmin');
const Admin = require('./Admin');
const Client = require('./Client');
const Livreur = require('./Livreur');
const Colis = require('./colis');
const Pickup = require('./Pickup');

// Define relationships
SuperAdmin.hasMany(Admin, { foreignKey: 'superadminId' });
Admin.belongsTo(SuperAdmin, { foreignKey: 'superadminId' });

// Associations
Admin.hasMany(Client, { foreignKey: 'adminId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Client.belongsTo(Admin, { foreignKey: 'adminId' });

Admin.hasMany(Livreur, { foreignKey: 'adminId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Livreur.belongsTo(Admin, { foreignKey: 'adminId' });

// Colis associations
Colis.belongsTo(Admin, { foreignKey: 'adminId' });
Colis.belongsTo(Livreur, { foreignKey: 'livreurId' });

//pickups

Admin.hasMany(Pickup, { foreignKey: 'adminId', onDelete: 'CASCADE', onUpdate: 'CASCADE' }); // Admin has many pickups
Pickup.belongsTo(Admin, { foreignKey: 'adminId' });

Client.hasMany(Pickup, { foreignKey: 'clientId', onDelete: 'CASCADE', onUpdate: 'CASCADE' }); // Client has many pickups
Pickup.belongsTo(Client, { foreignKey: 'clientId' });

Livreur.hasMany(Pickup, { foreignKey: 'livreurId', onDelete: 'CASCADE', onUpdate: 'CASCADE' }); // Livreur has many pickups
Pickup.belongsTo(Livreur, { foreignKey: 'livreurId' });




sequelize.sync({ force: false }) // Use { force: true } to drop & recreate tables
  .then(() => console.log('Tables have been synced'))
  .catch(err => console.error('Error syncing tables: ' + err));

module.exports = {
  SuperAdmin,
  Admin,
  Client,
  Livreur,
  Colis,
  Pickup,
  sequelize
};
