// controllers/colisController.js
const Colis = require('../models/colisModel');
const Admin = require('../models/adminModel'); // Adjust the path as necessary

// Get all colis
exports.getAllColis = async (req, res) => {
  try {
    const colis = await Colis.findAll();
    res.status(200).json(colis);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching colis', error });
  }
};

// Get colis by ID
exports.getColisById = async (req, res) => {
  try {
    const { id } = req.params;
    const colis = await Colis.findByPk(id);

    if (!colis) {
      return res.status(404).json({ message: 'Colis not found' });
    }

    res.status(200).json(colis);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching colis', error });
  }
};

// Create a new colis
exports.createColis = async (req, res) => {
  try {
    const { code, expediteur, destinataire, telephone, montant, depot, adresse, statut, adminId } = req.body;

    // Validate if the admin exists
    const admin = await Admin.findByPk(adminId);
    if (!admin) {
      return res.status(400).json({ message: 'Invalid adminId' });
    }

    // Create a new colis
    const newColis = await Colis.create({
      code,
      expediteur,
      destinataire,
      telephone,
      montant,
      depot,
      adresse,
      statut,
      adminId,
    });

    res.status(201).json({ message: 'Colis created successfully', colis: newColis });
  } catch (error) {
    res.status(500).json({ message: 'Error creating colis', error });
  }
};

// Update an existing colis
exports.updateColis = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, expediteur, destinataire, telephone, montant, depot, adresse, statut, adminId } = req.body;

    const colis = await Colis.findByPk(id);

    if (!colis) {
      return res.status(404).json({ message: 'Colis not found' });
    }

    // Validate if the admin exists
    if (adminId) {
      const admin = await Admin.findByPk(adminId);
      if (!admin) {
        return res.status(400).json({ message: 'Invalid adminId' });
      }
    }

    // Update the colis details
    colis.code = code;
    colis.expediteur = expediteur;
    colis.destinataire = destinataire;
    colis.telephone = telephone;
    colis.montant = montant;
    colis.depot = depot;
    colis.adresse = adresse;
    colis.statut = statut;
    if (adminId) colis.adminId = adminId;

    await colis.save();

    res.status(200).json({ message: 'Colis updated successfully', colis });
  } catch (error) {
    res.status(500).json({ message: 'Error updating colis', error });
  }
};

// Delete a colis
exports.deleteColis = async (req, res) => {
  try {
    const { id } = req.params;

    const colis = await Colis.findByPk(id);

    if (!colis) {
      return res.status(404).json({ message: 'Colis not found' });
    }

    await colis.destroy();

    res.status(200).json({ message: 'Colis deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting colis', error });
  }
};
