const Colis = require('../models/colis');

// Get all colis
const getAllColis = async (req, res) => {
  try {
    const colis = await Colis.findAll();
    res.json(colis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get colis by ID
const getColisById = async (req, res) => {
  const { id } = req.params;
  try {
    const colis = await Colis.findByPk(id);
    if (colis) {
      res.json(colis);
    } else {
      res.status(404).json({ error: 'Colis not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get colis by code
const getColisByCode = async (req, res) => {
  const { code } = req.params;
  try {
    const colis = await Colis.findOne({ where: { code } });
    if (colis) {
      res.json(colis);
    } else {
      res.status(404).json({ error: 'Colis not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new colis
const createColis = async (req, res) => {
  const { code, expediteur, destinataire, telephone, montant, depot, adresse, statut, adminId, livreurId, clientId } = req.body;
  try {
    const newColis = await Colis.create({ code, expediteur, destinataire, telephone, montant, depot, adresse, statut, adminId, livreurId, clientId });
    res.status(201).json(newColis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a colis by ID
const updateColis = async (req, res) => {
  const { id } = req.params;
  const { code, expediteur, destinataire, telephone, montant, depot, adresse, statut, adminId, livreurId, clientId } = req.body;
  try {
    const colis = await Colis.findByPk(id);
    if (colis) {
      await colis.update({ code, expediteur, destinataire, telephone, montant, depot, adresse, statut, adminId, livreurId, clientId });
      res.json(colis);
    } else {
      res.status(404).json({ error: 'Colis not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a colis by ID
const deleteColis = async (req, res) => {
  const { id } = req.params;
  try {
    const colis = await Colis.findByPk(id);
    if (colis) {
      await colis.destroy();
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Colis not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get all colis for a specific livreur
const getColisByLivreurId = async (req, res) => {
  const { livreurId } = req.params;
  try {
    const colis = await Colis.findAll({ where: { livreurId } });
    if (colis.length > 0) {
      res.json(colis);
    } else {
      res.status(404).json({ error: 'No colis found for this livreur' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllColis,
  getColisById,
  createColis,
  updateColis,
  deleteColis,
  getColisByLivreurId, 
};

