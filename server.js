const app = require('./app');
const connectDB = require('./config/db.config');
const dns = require('dns');

// Programmatic DNS Fix: Force Node.js to use Google DNS for internal lookups
// This bypasses local network/ISP DNS issues without changing OS settings.
dns.setServers(['8.8.8.8', '8.8.4.4']);

// Connect to database
connectDB();

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});
