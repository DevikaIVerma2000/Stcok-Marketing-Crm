const express = require('express');
const router = express.Router();
const userAccessLogsController = require('../controllers/userAccessLogsController');


router.post('/log-access', userAccessLogsController.logUserAccess);

module.exports = router;
