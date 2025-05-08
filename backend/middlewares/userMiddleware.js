
const jwt = require('jsonwebtoken');
const UserAuth = require('../models/userAuthModel');
const { validationResult } = require('express-validator'); 

// Authentication middleware
async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    const error = new Error('Access denied. No valid token provided.');
    error.statusCode = 401;
    return next(error); 
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      const error = new Error('JWT_SECRET environment variable is required');
      error.statusCode = 500;
      throw error;
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.purpose && decoded.purpose !== 'auth') {
      const error = new Error('Invalid token purpose.');
      error.statusCode = 401;
      return next(error);
    }

    const userAuth = await UserAuth.findOne({ _id: decoded.id, deleted_at: null }).populate('user_id');
    if (!userAuth) {
      const error = new Error('User not found or deleted.');
      error.statusCode = 401;
      return next(error);
    }

    if (userAuth.emp_access_status !== 'active') {
      const error = new Error(`Account ${userAuth.emp_access_status}. Contact support.`);
      error.statusCode = 403;
      return next(error);
    }

    if (!userAuth.user_id) {
      const error = new Error('Linked user not found.');
      error.statusCode = 401;
      return next(error);
    }

    req.user = { id: userAuth._id, branch_id: userAuth.user_id.branch_id };
    next();
  } catch (err) {
    const error = new Error('Invalid or expired token.');
    error.statusCode = 401;
    return next(error);
  }
}

// Global error handling middleware
function errorHandler(err, req, res, next) {

  // Default status code and message
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';

  // Handle validation errors 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    statusCode = 400;
    return res.status(statusCode).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map((e) => e.message).join(', ');
    return res.status(statusCode).json({
      success: false,
      message
    });
  }

  // Handle Mongoose duplicate key errors
  if (err.code && err.code === 11000) {
    statusCode = 400;
    message = 'Duplicate key error';
    return res.status(statusCode).json({
      success: false,
      message
    });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Invalid or expired token';
    return res.status(statusCode).json({
      success: false,
      message
    });
  }

  // Handle 404 errors
  if (err.statusCode === 404) {
    return res.status(404).json({
      success: false,
      message: err.message || 'Resource not found'
    });
  }

  // Handle generic errors
  // Hide sensitive details in production
  if (process.env.NODE_ENV === 'production') {
    message = 'Internal server error';
  }

  res.status(statusCode).json({
    success: false,
    message
  });
}

module.exports = { requireAuth, errorHandler };