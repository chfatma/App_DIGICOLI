const User = require('../models/userModel');



// Create and Save a new Livreur
exports.createLivreur = (req, res) => {
  
  if (!req.body) {
    return res.status(400).send({
      message: 'Content cannot be empty!'
    });
  }

  // Create with  role "livreur"
  const user = {
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,  
    phone: req.body.phone,
    address: req.body.address,
    governorate: req.body.governorate,
    role: 'livreur', 
    date_naissance: req.body.date_naissance 
  };

  // Save 
  User.create(user, (err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || 'Some error occurred while creating the Livreur.'
      });
    } else {
      return res.send(data);
    }
  });
};

// get all Users buy role
exports.findAllByRole = (req, res) => {
  User.getByRole(req.params.role, (err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || 'Some error occurred while retrieving users.'
      });
    } else {
      return res.send(data);
    }
  });
};

// get all
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err) {
      return res.status(500).send({
        message: err.message || 'Some error occurred while retrieving users.'
      });
    } else {
      return res.send(data);
    }
  });
};

// Find by id
exports.findOne = (req, res) => {
  User.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        return res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`
        });
      } else {
        return res.status(500).send({
          message: 'Error retrieving User with id ' + req.params.userId
        });
      }
    } else {
      return res.send(data);
    }
  });
};

// Update by id
exports.update = (req, res) => {
 
  if (!req.body) {
    return res.status(400).send({
      message: 'Content cannot be empty!'
    });
  }

  User.updateById(req.params.userId, new User(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        return res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`
        });
      } else {
        return res.status(500).send({
          message: 'Error updating User with id ' + req.params.userId
        });
      }
    } else {
      return res.send(data);
    }
  });
};

// delete by id
exports.delete = (req, res) => {
  User.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        return res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`
        });
      } else {
        return res.status(500).send({
          message: 'Could not delete User with id ' + req.params.userId
        });
      }
    } else {
      return res.send({ message: 'User was deleted successfully!' });
    }
  });
};
