const express = require('express');
const session = require('express-session');
const cors = require('cors');
const superadminRoutes = require('./routes/superadminRoutes');
const adminRoutes = require('./routes/adminRoutes');
const clientRoutes = require('./routes/clientRoutes');
const livreurRoutes = require('./routes/livreurRoutes');
const authRoutes = require('./routes/authRoutes'); 
const colisRoutes = require('./routes/colisRoutes'); 
const pickupRoutes = require('./routes/pickupRoutes');
const evaluationRoutes = require('./routes/evaluationRoutes');
const sequelize = require('./models').sequelize;


const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON
app.use(express.json());

// Session configuration
app.use(cors()); 
app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

// routes
app.use('/api/superadmins', superadminRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/livreurs', livreurRoutes);
app.use('/api/auth', authRoutes); 
app.use('/api/colis', colisRoutes); 
app.use('/api/pickups', pickupRoutes);
app.use('/api/evaluations', evaluationRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  sequelize.sync();
});
