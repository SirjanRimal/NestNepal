const validateSale = (req, res, next) => {
    const { agentName, amount, deals } = req.body;

    if (!agentName || typeof agentName !== 'string' || agentName.trim() === '') {
        return res.status(400).json({
            success: false,
            message: 'agentName is required and must be a non-empty string'
        });
    }

    if (amount === undefined || typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({
            success: false,
            message: 'amount is required and must be a positive number'
        });
    }

    if (deals === undefined || typeof deals !== 'number' || !Number.isInteger(deals) || deals <= 0) {
        return res.status(400).json({
            success: false,
            message: 'deals is required and must be a positive integer'
        });
    }

    next();
};

module.exports = { validateSale };
