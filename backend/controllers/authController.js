const db = require('../config/db');

exports.login = (req, res) => {
  const { email, password } = req.body;

  // Check if user exists in users table
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, userResults) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (userResults.length === 0) {
      // Check if user exists in clients table
      const clientQuery = 'SELECT * FROM clients WHERE email = ?';
      db.query(clientQuery, [email], (err, clientResults) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Server error' });
        }

        if (clientResults.length === 0) {
          return res.status(404).json({ message: 'User not found' });
        }

        // Compare password for clients (plain text)
        const client = clientResults[0];
        if (password === client.password) {
          // Passwords match
          return res.status(200).json({ message: 'Login successful', role: client.role });
        } else {
          // Passwords do not match
          return res.status(401).json({ message: 'Invalid credentials' });
        }
      });
    } else {
      // Compare password for users (plain text)
      const user = userResults[0];
      if (password === user.password) {
        // Passwords match
        return res.status(200).json({ message: 'Login successful', role: user.role });
      } else {
        // Passwords do not match
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    }
  });
};
