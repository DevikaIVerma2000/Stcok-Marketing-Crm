const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body } = require('express-validator'); 
const UserAuth = require('../models/userAuthModel');

// Validation for login
const loginValidation = [
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .trim()
    .escape()
    .isLength({ min: 3, max: 25 })
    .withMessage('Username must be 3-25 characters')
    .matches(/^[a-zA-Z0-9._-]+$/)
    .withMessage('Username can only contain letters, numbers, dots, underscores, or hyphens'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 5, max: 25 })
    .withMessage('Password must be 5-25 characters')
];

// Validation for reset password
const resetPasswordValidation = [
  body('newPassword')
    .notEmpty()
    .withMessage('New password is required')
    .isLength({ min: 8, max: 50 })
    .withMessage('Password must be 8-50 characters')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage('Password must include letters, numbers, and special characters'),
  body('confirmPassword')
    .notEmpty()
    .withMessage('Confirm password is required')
    .custom((value, { req }) => value === req.body.newPassword)
    .withMessage('Passwords do not match')
];

async function userLogin(req, res) {
  const { username, password } = req.body;

  try {
    const user = await UserAuth.findOne({ username }).select('+password');

    if (!user || user.emp_access_status !== 'active') {
      return res.status(401).json({ message: 'Invalid credentials or inactive account' });
    }

    const maxAttempts = 5;
    if (user.wrong_attempts >= maxAttempts) {
      return res.status(403).json({ message: 'Account locked. Contact support.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      user.wrong_attempts += 1;
      await user.save();
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    user.wrong_attempts = 0;
    user.login_status = true;
    user.last_login = new Date();
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000
    });

    return res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
}

async function resetPassword(req, res) {
  const { newPassword , confirmPassword } = req.body;
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Invalid or missing authorization token' });
  }

  const token = authHeader.split(' ')[1];

  try {

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await UserAuth.findById(userId).select('+password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.emp_access_status !== 'active') {
      return res.status(403).json({ message: `Cannot reset password for ${user.emp_access_status} account` });
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return res.status(400).json({ message: 'New password cannot be the same as the current password' });
    }

    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(newPassword, salt);
    user.last_updated = new Date();
    await user.save();

    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    return res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    return res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { userLogin, resetPassword, loginValidation, resetPasswordValidation };