// controllers/userController.js
const User  = require('../models/userModel'); // Adjust if needed based on how you import your models

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};

// Get users by role
exports.getUsersByRole = async (req, res) => {
  try {
    const { role } = req.params;
    const users = await User.findAll({ where: { role } });

    if (users.length === 0) {
      return res.status(404).json({ message: 'No users found with this role' });
    }

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users by role', error });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { email, first_name, last_name, password, phone, address, governorate, role, date_naissance } = req.body;

    // Create a new user
    const newUser = await User.create({
      email,
      first_name,
      last_name,
      password,
      phone,
      address,
      governorate,
      role,
      date_naissance,
    });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};

// Update an existing user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, first_name, last_name, password, phone, address, governorate, role, date_naissance } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user details
    user.email = email;
    user.first_name = first_name;
    user.last_name = last_name;
    user.password = password;
    user.phone = phone;
    user.address = address;
    user.governorate = governorate;
    user.role = role;
    user.date_naissance = date_naissance;

    await user.save();

    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};
