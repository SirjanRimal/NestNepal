const Sale = require('../models/Sales.models');

/**
 * @desc    Add a new sales record
 * @route   POST /api/sales
 * @access  Public
 */
const addSale = async (req, res, next) => {
    try {
        const { agentName, amount, deals } = req.body;

        const sale = await Sale.create({
            agentName,
            amount,
            deals
        });

        res.status(201).json({
            success: true,
            data: sale
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get the sales leaderboard
 * @route   GET /api/leaderboard
 * @access  Public
 */
const getLeaderboard = async (req, res, next) => {
    try {
        const leaderboard = await Sale.aggregate([
            {
                $group: {
                    _id: "$agentName",
                    totalSales: { $sum: "$amount" },
                    totalDeals: { $sum: "$deals" }
                }
            },
            {
                $sort: {
                    totalSales: -1,
                    totalDeals: -1
                }
            },
            {
                $project: {
                    _id: 0,
                    agentName: "$_id",
                    totalSales: 1,
                    totalDeals: 1
                }
            }
        ]);

        // Add rank
        const rankedLeaderboard = leaderboard.map((item, index) => ({
            rank: index + 1,
            ...item
        }));

        res.status(200).json({
            success: true,
            count: rankedLeaderboard.length,
            data: rankedLeaderboard
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addSale,
    getLeaderboard
};
