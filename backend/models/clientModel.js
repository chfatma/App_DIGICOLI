const db = require('../config/db');


const Client = function(client) {
  this.email = client.email;
  this.first_name = client.first_name;
  this.last_name = client.last_name;
  this.password = client.password;
  this.phone = client.phone;
  this.address = client.address;
  this.governorate = client.governorate;
  this.date_naissance = client.date_naissance;
  this.role = client.role;
  this.colisALivrer = client.colisALivrer;
};

// Get all 
Client.getAll = result => {
  db.query('SELECT * FROM clients', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

// create 
Client.create = (newClient, result) => {
  const query = `INSERT INTO clients (email, first_name, last_name, password, phone, address, governorate, date_naissance, role, colisALivrer) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [newClient.email, newClient.first_name, newClient.last_name, newClient.password, newClient.phone, newClient.address, newClient.governorate, newClient.date_naissance, newClient.role, newClient.colisALivrer];
  
  db.query(query, values, (error, results) => {
    if (error) {
      console.log('error: ', error);
      result(error, null);
      return;
    }
    result(null, { id: results.insertId, ...newClient });
  });
};

// find by id
Client.findById = (clientId, result) => {
  db.query('SELECT * FROM clients WHERE id = ?', [clientId], (err, res) => {
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

// Update by id
Client.updateById = (id, client, result) => {
  db.query(
    'UPDATE clients SET email = ?, first_name = ?, last_name = ?, password = ?, phone = ?, address = ?, governorate = ?, date_naissance = ?, role = ?, colisALivrer = ? WHERE id = ?',
    [client.email, client.first_name, client.last_name, client.password, client.phone, client.address, client.governorate, client.date_naissance, client.role, client.colisALivrer, id],
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
      result(null, { id: id, ...client });
    }
  );
};

// delete by id
Client.remove = (id, result) => {
  db.query('DELETE FROM clients WHERE id = ?', id, (err, res) => {
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

module.exports = Client;
