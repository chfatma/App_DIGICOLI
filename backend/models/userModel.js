const db = require('../config/db');

const User = function(user) {
  this.email = user.email;
  this.first_name = user.first_name;
  this.last_name = user.last_name;
  this.password = user.password;
  this.phone = user.phone;
  this.address = user.address;
  this.governorate = user.governorate;
  this.role = user.role;
  this.date_naissance = user.date_naissance;
};

User.getByRole = (role, result) => {
  db.query('SELECT * FROM users WHERE role = ?', [role], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

User.create = (newUser, result) => {
  db.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findById = (userId, result) => {
  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }
    result({ kind: 'not_found' }, null);
  });
};

User.updateById = (id, user, result) => {
  db.query(
    'UPDATE users SET email = ?, first_name = ?, last_name = ?, password = ?, phone = ?, address = ?, governorate = ?, role = ?, date_naissance = ? WHERE id = ?',
    [user.email, user.first_name, user.last_name, user.password, user.phone, user.address, user.governorate, user.role, user.date_naissance, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: 'not_found' }, null);
        return;
      }
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  db.query('DELETE FROM users WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: 'not_found' }, null);
      return;
    }
    result(null, res);
  });
};

User.getAll = result => {
  db.query('SELECT * FROM users', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = User;
