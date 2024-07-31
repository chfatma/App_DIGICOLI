const express = require('express');
const session = require('express-session');
const cors = require('cors');
const superadminRoutes = require('./routes/superadminRoutes');
const adminRoutes = require('./routes/adminRoutes');
const clientRoutes = require('./routes/clientRoutes');
const livreurRoutes = require('./routes/livreurRoutes');
const authRoutes = require('./routes/authRoutes'); // Import authentication routes
const sequelize = require('./models').sequelize;

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON
app.use(express.json());

// Session configuration
// Middleware
app.use(cors()); // Add this line to enable CORS for all routes
app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Change to true if using HTTPS
}));

// Set up routes
app.use('/api/superadmins', superadminRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/livreurs', livreurRoutes);
app.use('/api/auth', authRoutes);

// Start the server and sync the database
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  sequelize.sync(); // Sync database
});
