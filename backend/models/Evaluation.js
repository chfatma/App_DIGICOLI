const { DataTypes } = require('sequelize');
const sequelize = require('./index').sequelize;

const Evaluation = sequelize.define('Evaluation', {
  comment: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  evaluatorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  evaluatorRole: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Evaluation;
