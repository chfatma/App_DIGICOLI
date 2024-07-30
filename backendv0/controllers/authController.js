// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');
const User = require('../models/userModel'); // Import User model if you have one

const saltRounds = 10; // Number of rounds for bcrypt

// Helper function to find a user by email in both Admin and User tables
const findUserByEmail = async (email) => {
  // Search in Admin table
  let user = await Admin.findOne({ where: { email } });

  if (!user) {
    // If not found in Admin table, search in User table
    user = await User.findOne({ where: { email } });
  }

  return user;
};

// Unified login function
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user in both Admin and User tables
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // // Compare the password
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(401).json({ message: 'Invalid email or password' });
    // }
   // Compare the password (plain text comparison)
   if (password !== user.password) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
    // Generate JWT token
    // const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, 'hrdesfjd1541fgd78fd@dfhdfsghf5d524g524', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};
