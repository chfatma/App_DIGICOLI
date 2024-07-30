const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./config/database');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const userRoutes = require('./routes/userRoutes');
const pickupRoutes = require('./routes/pickupRoutes');
const colisRoutes = require('./routes/colisRoutes');
const clientRoutes = require('./routes/clientRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
// Simple route to try 


// User routes
app.use('/v1/api/users', userRoutes); // Prefix with /users or any preferred prefix
app.use('/v1/api/pickups', pickupRoutes); // Prefix with /pickups or any preferred prefix
app.use('/v1/api/colis', colisRoutes); // Prefix with /colis or any preferred prefix
app.use('/v1/api/clients', clientRoutes); // Prefix with /clients or any preferred prefix
app.use('/v1/api/admins', adminRoutes); // Prefix with /admins or any preferred prefix
app.use('/v1/api/auth', authRoutes); // Prefix with /auth or any preferred prefix





const PORT = process.env.PORT || 3000;
app.use(express.static("public"));

// Sync all models
sequelize.sync({ alter: true }).then(() => {
    console.log("Database & tables created!");
  })
  .catch((error) => console.log("This error occurred", error));
// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

