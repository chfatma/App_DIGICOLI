const User = require('../models/userModel');

exports.register = (req, res) => {
  const { email, first_name, last_name, password, confirm_password, role } = req.body;

  if (password !== confirm_password) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  const newUser = { email, first_name, last_name, password, role: role || 'client' };

  User.create(newUser, (err, user) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.status(201).json({ message: 'User registered successfully' });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmailAndPassword(email, password, (err, user) => {
    if (err) {
      if (err.kind === 'not_found') {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      return res.status(500).json({ message: err.message });
    }
    res.json({ message: 'Login successful', user });
  });
};
