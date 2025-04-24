const auth = require('./auth');

const admin = async (req, res, next) => {
    try {
        // First check if user is authenticated
        await auth(req, res, () => {
            // Then check if user is admin
            if (!req.user.isAdmin()) {
                return res.status(403).json({ status: 1, message: 'Access denied. Admin privileges required.' });
            }
            next();
        });
    } catch (error) {
        res.status(500).json({ status: 1, error: error.message });
    }
};

module.exports = admin; 