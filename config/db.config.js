const mongoose = require('mongoose');
const dns = require('dns');

const connectDB = async () => {
    // Internal code fix: programmatically set DNS servers to Google's to bypass local DNS resolution issues
    try {
        dns.setServers(['8.8.8.8', '8.8.4.4']);
    } catch (e) {
        console.log('Note: Could not set custom DNS servers, using system default.');
    }

    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            family: 4,
        });
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
