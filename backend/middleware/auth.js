/**
 * Authentication Middleware
 * JWT token verification and user authentication
 */

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Access token required'
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from database
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'User not found'
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        status: 'error',
        message: 'Account is deactivated'
      });
    }

    // Check if account is locked
    if (user.isLocked) {
      return res.status(401).json({
        status: 'error',
        message: 'Account is temporarily locked due to multiple failed login attempts'
      });
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'error',
        message: 'Token expired'
      });
    }

    return res.status(500).json({
      status: 'error',
      message: 'Authentication error'
    });
  }
};

// Admin role verification
const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({
      status: 'error',
      message: 'Admin access required'
    });
  }
  next();
};

// Staff or admin role verification
const requireStaff = (req, res, next) => {
  if (!['admin', 'staff'].includes(req.user.role)) {
    return res.status(403).json({
      status: 'error',
      message: 'Staff or admin access required'
    });
  }
  next();
};

// Permission-based access control
const requirePermission = (permission) => {
  return (req, res, next) => {
    if (req.user.role === 'admin') {
      return next(); // Admin has all permissions
    }

    if (!req.user.permissions[permission]) {
      return res.status(403).json({
        status: 'error',
        message: `Permission required: ${permission}`
      });
    }

    next();
  };
};

module.exports = {
  authenticateToken,
  requireAdmin,
  requireStaff,
  requirePermission
};
