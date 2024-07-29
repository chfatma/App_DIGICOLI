const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Admin = require('./adminModel');
const Client = require('./clientModel');
const Colis = require('./colisModel');
const Pickup = require('./pickupModel');
const User = require('./userModel');

// Define associations here
Admin.hasMany(Colis, { foreignKey: 'adminId' }); // Assuming Colis has an adminId foreign key
Colis.belongsTo(Admin, { foreignKey: 'adminId' });

Admin.hasMany(Client, { foreignKey: 'adminId' }); // Assuming Client has an adminId foreign key
Client.belongsTo(Admin, { foreignKey: 'adminId' });

Admin.hasMany(Pickup, { foreignKey: 'adminId' }); // Assuming Pickup has an adminId foreign key
Pickup.belongsTo(Admin, { foreignKey: 'adminId' });



// Add more associations as needed

sequelize.sync({ alter: true });


module.exports = {
    Admin,
    Client,
    Colis,
    Pickup,
    User,
    sequelize,
    Sequelize,
  };
