// server.js
require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const authRoutes = require("./routes/auth.routes");


// Connect to MongoDB
connectDB();

const app = express();



// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));



// Use routes
app.use("/api/auth", authRoutes);

//admin routes
app.use("/api/admin", require("./routes/admin.routes"));

//booking 
app.use("/api/bookings", require("./routes/booking.routes"));

//payment
app.use("/api/payments", require("./routes/payment.routes"));


// Health check route
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Packers & Movers API is running 🚚' });
});

// Error handler (basic)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
