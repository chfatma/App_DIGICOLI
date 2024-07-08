const db = require('../config/db');

const User = {};

User.create = (user, result) => {
  const query = `INSERT INTO users (email, first_name, last_name, password, role) VALUES (?, ?, ?, ?, ?)`;
  db.query(query, [user.email, user.first_name, user.last_name, user.password, user.role], (err, res) => {
    if (err) {
      return result(err, null);
    }
    return result(null, { id: res.insertId, ...user });
  });
};

User.findByEmailAndPassword = (email, password, result) => {
  const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
  db.query(query, [email, password], (err, res) => {
    if (err) {
      return result(err, null);
    }
    if (res.length === 0) {
      return result({ kind: 'not_found' }, null);
    }
    return result(null, res[0]);
  });
};

module.exports = User;
