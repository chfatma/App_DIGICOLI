const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('digicoli', 'root', '', {
  host: 'localhost',
  dialect: 'mysql', // Change this to your preferred database dialect (e.g., postgres, sqlite, etc.)
});

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('Error: ' + err));

module.exports = sequelize;
