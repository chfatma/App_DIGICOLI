
const Livreur = require('../models/Livreur');
const Admin = require('../models/Admin'); 

// Create a new livreur
exports.createLivreur = async (req, res) => {
  try {
    const { adminId } = req.body;

    if (!adminId) {
      return res.status(400).json({ message: 'Admin ID is required' });
    }

    const admin = await Admin.findByPk(adminId);

    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const livreur = await Livreur.create({ ...req.body, adminId });
    res.status(201).json(livreur);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a livreur by ID
exports.getLivreurById = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminId } = req.query;

    if (!adminId) {
      return res.status(400).json({ message: 'Admin ID is required' });
    }

    const livreur = await Livreur.findOne({ where: { id, adminId } });

    if (!livreur) {
      return res.status(404).json({ message: 'Livreur not found or not authorized' });
    }
    res.status(200).json(livreur);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a livreur
exports.updateLivreur = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminId } = req.body;

    if (!adminId) {
      return res.status(400).json({ message: 'Admin ID is required' });
    }

    const [updated] = await Livreur.update(req.body, {
      where: { id, adminId }
    });

    if (!updated) {
      return res.status(404).json({ message: 'Livreur not found or not authorized' });
    }
    res.status(200).json({ message: 'Livreur updated' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a livreur
exports.deleteLivreur = async (req, res) => {
  try {
    const { id } = req.params;
    const { adminId } = req.query;

    if (!adminId) {
      return res.status(400).json({ message: 'Admin ID is required' });
    }

    const deleted = await Livreur.destroy({
      where: { id, adminId }
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Livreur not found or not authorized' });
    }
    res.status(200).json({ message: 'Livreur deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAllLivreurs = async (req, res) => {
  try {
    const livreurs = await Livreur.findAll();
    res.status(200).json(livreurs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};