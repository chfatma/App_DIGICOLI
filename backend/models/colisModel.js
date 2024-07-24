const db = require('../config/db'); 

// Create 
exports.createColis = (colis, callback) => {
    const query = 'INSERT INTO colis (code, expediteur, destinataire, telephone, montant, depot, adresse, statut) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [colis.code, colis.expediteur, colis.destinataire, colis.telephone, colis.montant, colis.depot, colis.adresse, colis.statut];
  
    db.query(query, values, (err, result) => {
      if (err) {
        return callback(err);
      }
      callback(null, result);
    });
  };

// Get all 
exports.getAllColis = (callback) => {
    const query = 'SELECT * FROM colis';
    db.query(query, (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

// Get by id
exports.getColisById = (id, callback) => {
    const query = 'SELECT * FROM colis WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) return callback(err);
        callback(null, results[0]);
    });
};

// Update by id
exports.updateColis = (id, data, callback) => {
    const query = 'UPDATE colis SET code = ?, expediteur = ?, destinataire = ?, telephone = ?, montant = ?, depot = ?, adresse = ?, statut = ? WHERE id = ?';
    db.query(query, [data.code, data.expediteur, data.destinataire, data.telephone, data.montant, data.depot, data.adresse, data.statut, id], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

// Delete by id
exports.deleteColis = (id, callback) => {
    const query = 'DELETE FROM colis WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};
