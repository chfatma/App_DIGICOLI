// controllers/PickupController.js
const db = require('../models/pickupModel'); // Assuming Sequelize is used and models are configured

// Create a new pickup
exports.create = (req, res) => {
  const { clientId, date, totalColis, distribution, livreurId } = req.body;

  db.Pickup.create({
    clientId,
    date,
    totalColis,
    distribution,
    livreurId
  })
    .then(pickup => res.status(201).json(pickup))
    .catch(err => res.status(500).json({ message: err.message }));
};

// Get all pickups
exports.getAll = (req, res) => {
  db.Pickup.findAll({
    include: [
      { model: db.Client, as: 'client' },
      { model: db.User, as: 'livreur', where: { role: 'livreur' } }
    ]
  })
    .then(pickups => res.status(200).json(pickups))
    .catch(err => res.status(500).json({ message: err.message }));
};
