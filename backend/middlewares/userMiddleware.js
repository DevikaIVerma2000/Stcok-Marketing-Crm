
const jwt = require('jsonwebtoken');
const UserAuth = require('../models/userAuthModel');
const User = require('../models/userModel'); 

function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Access denied. No valid token provided.' });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'trupoint');
        UserAuth.findById(decoded.id).then(async (userAuth) => {
            if (!userAuth) {
                return res.status(401).json({ message: 'User not found.' });
            }

            const user = await User.findById(userAuth.user_id);
            if (!user) {
                return res.status(401).json({ message: 'Linked user not found.' });
            }
            req.user = { id: userAuth._id, branch_id: user.branch_id };
            next();
        }).catch(() => {
            return res.status(401).json({ message: 'Invalid user.' });
        });
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
}

function errorHandler(err, req, res, next) {
    console.error(err.stack);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    res.status(statusCode).json({ success: false, message });
}

module.exports = { requireAuth, errorHandler };
