const Client = require('../models/Client');
const Livreur = require('../models/Livreur');
const Superadmin = require('../models/SuperAdmin');
const Admin = require('../models/Admin');

// Unified login function
exports.loginUser = async (req, res) => {
  const { email, motdepasse } = req.body;

  console.log('Received request body:', req.body);

  if (!email || !motdepasse) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Check credentials for each model
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

// Helper function to handle user authentication
const authenticateUser = (req, res, user, role) => {
  // Store user in session
  req.session.user = {
    id: user.id,
    email: user.email,
    role: role,
    superadminId: role === 'Superadmin' ? user.id : '',

  };

  // Send response with user data
  res.status(200).json({
    message: 'Login successful',
    user: req.session.user,
  });
};

// Logout function
exports.logoutUser = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
};
