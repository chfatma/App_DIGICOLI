const { SuperAdmin, Admin } = require('../models');

// Create SuperAdmin
exports.createSuperAdmin = async (req, res) => {
  try {
    const { email, nom, prenom, motdepasse, telephone, address, governorate, date_naissance } = req.body;
    const superadmin = await SuperAdmin.create({ email, nom, prenom, motdepasse, telephone, address, governorate, date_naissance });
    res.status(201).json(superadmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create Admin by SuperAdmin
exports.createAdmin = async (req, res) => {
  try {
    const { superadminId, email, nom, prenom, motdepasse, telephone, address, governorate, date_naissance } = req.body;

    // Verify SuperAdmin existence
    const superadmin = await SuperAdmin.findByPk(superadminId);
    if (!superadmin) {
      return res.status(403).json({ error: 'Unauthorized action' });
    }

    // Create Admin
    const admin = await Admin.create({
      superadminId,
      email,
      nom,
      prenom,
      motdepasse,
      telephone,
      address,
      governorate,
      date_naissance,
    });

    res.status(201).json(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
