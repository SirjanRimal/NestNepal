const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    agentName: {
        type: String,
        required: [true, 'Agent name is required'],
        trim: true
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
        min: [0.01, 'Amount must be a positive number']
    },
    deals: {
        type: Number,
        required: [true, 'Deals count is required'],
        min: [1, 'Deals must be at least 1']
    }
}, {
    timestamps: true
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
