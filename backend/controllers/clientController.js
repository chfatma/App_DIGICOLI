const Client = require('../models/clientModel');

// Create and Save a new Client
exports.create = (req, res) => {

  if (!req.body) {
    return res.status(400).send({
      message: 'Content cannot be empty!'
    });
  }

  // Create a Client
  const client = new Client({
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
    phone: req.body.phone,
    address: req.body.address,
    governorate: req.body.governorate,
    date_naissance: req.body.date_naissance,
    role: req.body.role || 'client',
    colisALivrer: req.body.colisALivrer
  });

  // Save Client in the database
  Client.create(client, (err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || 'Some error occurred while creating the Client.'
      });
    } else {
      return res.send(data);
    }
  });
};

// get all Clients from the database
exports.findAll = (req, res) => {
  Client.getAll((err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || 'Some error occurred while retrieving clients.'
      });
    } else {
      return res.send(data);
    }
  });
};

// Find one Client with a Id
exports.findOne = (req, res) => {
  Client.findById(req.params.clientId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        return res.status(404).send({
          message: `Not found Client with id ${req.params.clientId}.`
        });
      } else {
        return res.status(500).send({
          message: 'Error retrieving Client with id ' + req.params.clientId
        });
      }
    } else {
      return res.send(data);
    }
  });
};

// Update a Client identifie by the id 
exports.update = (req, res) => {

  if (!req.body) {
    return res.status(400).send({
      message: 'Content cannot be empty!'
    });
  }

  const client = new Client(req.body);

  Client.updateById(req.params.clientId, client, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        return res.status(404).send({
          message: `Not found Client with id ${req.params.clientId}.`
        });
      } else {
        return res.status(500).send({
          message: 'Error updating Client with id ' + req.params.clientId
        });
      }
    } else {
      return res.send(data);
    }
  });
};

// Delete a Client with  id
exports.delete = (req, res) => {
  Client.remove(req.params.clientId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        return res.status(404).send({
          message: `Not found Client with id ${req.params.clientId}.`
        });
      } else {
        return res.status(500).send({
          message: 'Could not delete Client with id ' + req.params.clientId
        });
      }
    } else {
      return res.send({ message: 'Client was deleted successfully!' });
    }
  });
};
