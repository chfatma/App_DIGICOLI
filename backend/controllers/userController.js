const { Admin, Livreur, Superadmin } = require('../models'); // Import all models

// Function to get user by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  const role = req.query.role;

  try {
    let user;
    switch (role) {
      case 'Admin':
        user = await Admin.findByPk(id);
        break;
      case 'Livreur':
        user = await Livreur.findByPk(id);
        break;
      case 'Superadmin':
        user = await Superadmin.findByPk(id);
        break;
      default:
        return res.status(400).json({ message: 'Invalid user role' });
    }

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: error.message });
  }
};

// Function to update user by ID
exports.updateUserById = async (req, res) => {
  const { id } = req.params;
  const role = req.query.role;
  const { nom, email, motdepasse } = req.body;

  try {
    let user;
    switch (role) {
      case 'Admin':
        user = await Admin.findByPk(id);
        break;
      case 'Livreur':
        user = await Livreur.findByPk(id);
        break;
      case 'Superadmin':
        user = await Superadmin.findByPk(id);
        break;
      default:
        return res.status(400).json({ message: 'Invalid user role' });
    }

    if (user) {
      user.nom = nom;
      user.email = email;
      user.motdepasse = motdepasse; // Ideally, hash the password before saving
      await user.save();
      res.status(200).json({ message: 'Profile updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ message: error.message });
  }
};
