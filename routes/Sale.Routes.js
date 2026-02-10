const express = require('express');
const router = express.Router();
const { addSale, getLeaderboard } = require('../Controllers/Sale.Controllers');
const { validateSale } = require('../middlewares/validate.middleware');

// @route   POST /api/sales
router.post('/sales', validateSale, addSale);

// @route   GET /api/leaderboard
router.get('/leaderboard', getLeaderboard);

module.exports = router;
