// routes/clientRoutes.js
module.exports = app => {
  const clients = require('../controllers/clientController');

  app.post('/clients', clients.create);
  app.get('/clients', clients.findAll);
  app.get('/clients/:clientId', clients.findOne);
  app.put('/clients/:clientId', clients.update);

  
  app.delete('/clients/:clientId', clients.delete);



};
