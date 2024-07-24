module.exports = app => {
  const users = require('../controllers/userController');

  app.post('/users', users.create);

  app.post('/livreurs', users.createLivreur);  

  app.get('/users', users.findAll);

  app.get('/users/role/:role', users.findAllByRole); 

  app.get('/users/:userId', users.findOne);

  app.put('/users/:userId', users.update);

  app.delete('/users/:userId', users.delete);
};
