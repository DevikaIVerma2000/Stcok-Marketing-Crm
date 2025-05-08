const express = require('express');
const router = express.Router();
const { userLogin, resetPassword, loginValidation, resetPasswordValidation } = require('../controllers/userAuthController');
const { loginLimiter, resetPasswordLimiter } = require('../middlewares/authRateLimiters');
const { requireAuth } = require('../middlewares/userMiddleware');
const validate = require('../middlewares/validate');

router.post('/login', loginLimiter, loginValidation, validate, userLogin);
router.post('/reset-password', requireAuth, resetPasswordLimiter, resetPasswordValidation, validate, resetPassword);

module.exports = router;