const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const saleRoutes = require('./routes/Sale.Routes');
const { errorHandler } = require('./middlewares/error.middleware');

// Load env vars
dotenv.config();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api', saleRoutes);

// Error handler
app.use(errorHandler);

module.exports = app;
