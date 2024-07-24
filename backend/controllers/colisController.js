const colisModel = require('../models/colisModel');

// Create a new colis
exports.createColis = (req, res) => {
    const { code, expediteur, destinataire, telephone, montant, depot, adresse, statut } = req.body;
  
    colisModel.createColis({ code, expediteur, destinataire, telephone, montant, depot, adresse, statut }, (err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.status(201).json({ id: result.insertId });
    });
  }

// Get all colis
exports.getAllColis = (req, res) => {
    colisModel.getAllColis((err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(200).json(results);
    });
};

// Get a one colis id
exports.getColisById = (req, res) => {
    colisModel.getColisById(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        if (!result) return res.status(404).json({ message: 'Colis not found' });
        res.status(200).json(result);
    });
};

// Update a colis by id
exports.updateColis = (req, res) => {
    colisModel.updateColis(req.params.id, req.body, (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(200).json({ message: 'Colis updated successfully' });
    });
};

// Delete a colis by is
exports.deleteColis = (req, res) => {
    colisModel.deleteColis(req.params.id, (err, result) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(200).json({ message: 'Colis deleted successfully' });
    });
};
