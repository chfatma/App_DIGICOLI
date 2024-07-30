
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('try', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = { sequelize };