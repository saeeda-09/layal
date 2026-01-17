const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');

const protect = async (req, res, next) => {
    let token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-password');
        next();
    } catch (error) {
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: "Not authorized as an admin" });
    }
};

module.exports = { protect, admin };


/*const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');
const { tr, ca } = require('zod/locales');
const { use } = require('react');

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header('Authorization').replace('Bearer ', '');
        if (!token) 
            return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            if(!user)
                return res.status(401).json({ success: false, message: 'User not found' });
                req.user = user;
                next();
            }   catch (error) {
        res.status(500).json({ success: false, message: 'Invalid token.' });
            }
    };

module.exports = { authenticate };*/