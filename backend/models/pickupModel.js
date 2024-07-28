// models/Pickup.js
module.exports = (sequelize, DataTypes) => {
    const Pickup = sequelize.define('Pickup', {
      clientId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      totalColis: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      distribution: {
        type: DataTypes.STRING,
        allowNull: false
      },
      livreurId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
  
    Pickup.associate = function(models) {
      Pickup.belongsTo(models.Client, { as: 'client', foreignKey: 'clientId' });
      Pickup.belongsTo(models.User, { as: 'livreur', foreignKey: 'livreurId' });
    };
  
    return Pickup;
  };
  