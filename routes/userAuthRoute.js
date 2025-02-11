const express = require('express');
const router = express.Router();
const { userLogin, resetPassword } = require('../controllers/userAuthController');
const { requireAuth } = require('../middlewares/userMiddleware');

router.post('/login', userLogin);
router.post('/reset-password', requireAuth, resetPassword);

module.exports = router;
