const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Simple route to try 
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the User Management System.' });
});

// User routes
require('./routes/userRoutes')(app);


// Client routes
require('./routes/clientRoutes')(app);



// Colis routes
const colisRoutes = require('./routes/colisRoutes');
app.use('/api/colis', colisRoutes);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
