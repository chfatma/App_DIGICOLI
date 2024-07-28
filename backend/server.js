const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));









app.use('/auth', authRoutes);





// Simple route to try 
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the User Management System.' });
});

// User routes
const userRoutes = require('./routes/userRoutes');
userRoutes(app);

// Client routes
const clientRoutes = require('./routes/clientRoutes');
app.use('/clients', clientRoutes);  // Updated route prefix

// Colis routes
const colisRoutes = require('./routes/colisRoutes');
app.use('/api/colis', colisRoutes);



// Import and use pickup routes
const pickupRoutes = require('./routes/pickupRoutes');
app.use('/api', pickupRoutes);  // Ensure the path prefix matches





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
