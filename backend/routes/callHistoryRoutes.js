const express = require('express');
const {  createCallHistory, getAllCallHistory, getCallHistoryById, updateCallHistory, deleteCallHistory } = require('../controllers/callHistoryController');
const router = express.Router();

router.post('/callHistory', createCallHistory);
router.get('/callHistory', getAllCallHistory);
router.get('/callHistory/:id', getCallHistoryById);
router.put('/callHistory/:id', updateCallHistory);
router.delete('/callHistory/:id', deleteCallHistory);

module.exports = router;
