const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserAuth = require('../models/userAuthModel');
const rateLimit = require('express-rate-limit');

// Rate limiter 
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, 
  message: { message: 'Too many login attempts. Try again later.' }
});

// Rate limiter for password reset
const resetPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, 
  message: { message: 'Too many password reset attempts. Try again later.' }
});

async function userLogin(req, res) {
  const { username, password } = req.body;

  
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }

  try {
    const user = await UserAuth.findOne({ username }).select('+password');

    // Generic error for user not found or inactive account
    if (!user || user.emp_access_status !== 'active') {
      return res.status(401).json({ message: 'Invalid credentials or inactive account' });
    }

    // Check max login attempts
    const maxAttempts = 5;
    if (user.wrong_attempts >= maxAttempts) {
      return res.status(403).json({ message: 'Account locked. Contact support.' });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      user.wrong_attempts += 1;
      await user.save();
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Reset attempts and update status
    user.wrong_attempts = 0;
    user.login_status = true;
    user.last_login = new Date();
    await user.save();

    // Generate JWT with minimal payload
    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' } 
    );

    
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict', 
      maxAge: 3600000,
    });

    return res.status(200).json({ message: 'Login successful' , token });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}

async function resetPassword(req, res) {
  const { newPassword, confirmPassword } = req.body;
  const authHeader = req.headers.authorization;

  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Invalid or missing authorization token' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    
    if (!newPassword || !confirmPassword) {
      return res.status(400).json({ message: 'New password and confirm password required' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Password strength validation (min 5 chars, letters, numbers)
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({ message: 'Password must be at least 5 characters long and include letters and numbers' });
    }

    const user = await UserAuth.findById(userId).select('+password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check account status
    if (user.emp_access_status !== 'active') {
      return res.status(403).json({ message: `Cannot reset password for ${user.emp_access_status} account` });
    }

    // Check if new password matches current password
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({ message: 'New password cannot be the same as the current password' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(newPassword, salt);
    user.last_updated = new Date();

    await user.save();

    return res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    // Handle token errors
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    return res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { userLogin, resetPassword, loginLimiter, resetPasswordLimiter };