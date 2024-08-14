const Client = require('../models/Client');
const Livreur = require('../models/Livreur');
const Superadmin = require('../models/SuperAdmin');
const Admin = require('../models/Admin');


exports.loginUser = async (req, res) => {
  const { email, motdepasse } = req.body;

  console.log('Received request body:', req.body);

  if (!email || !motdepasse) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {

    let user = await Client.findOne({ where: { email, motdepasse } });
    if (user) return authenticateUser(req, res, user, 'Client');

    user = await Livreur.findOne({ where: { email, motdepasse } });
    if (user) return authenticateUser(req, res, user, 'Livreur');

    user = await Superadmin.findOne({ where: { email, motdepasse } });
    if (user) return authenticateUser(req, res, user, 'Superadmin');

    user = await Admin.findOne({ where: { email, motdepasse } });
    if (user) return authenticateUser(req, res, user, 'Admin');

    res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const authenticateUser = (req, res, user, role) => {
  // Store user in session
  req.session.user = {
    id: user.id,
    email: user.email,
    nom : user.nom, 
    role: role,
    superadminId: role === 'Superadmin' ? user.id : null,
    adminId: role === 'Admin' ? user.id : null,
    livreurId: role === 'Livreur' ? user.id : null,
    clientId: role === 'Client' ? user.id : null,
  };


  res.status(200).json({
    message: 'Login successful',
    user: req.session.user,
  });
};


exports.logoutUser = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
};







exports.updateUserProfile = async (req, res) => {
  const { id, nom, email, motdepasse, role } = req.body;

  if (!id || !role) {
    return res.status(400).json({ message: 'ID, email, and role are required' });
  }

  // Define valid roles
  const validRoles = ['admin', 'livreur', 'client', 'superadmin'];

  if (!validRoles.includes(role.toLowerCase())) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    let user;

    switch (role.toLowerCase()) { 
      case 'admin':
        user = await Admin.findByPk(id);
        break;
      case 'livreur': 
        user = await Livreur.findByPk(id);
        break;
      case 'client':
        user = await Client.findByPk(id);
        break;
      case 'superadmin':
        user = await Superadmin.findByPk(id);
        break;
      default:
        return res.status(400).json({ message: 'Invalid role' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.nom = nom || user.nom;
    user.email = email || user.email;
    if (motdepasse) user.motdepasse = motdepasse;

    await user.save();

    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};