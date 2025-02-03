const express = require('express');
const {  createCallHistory, getAllCallHistory, getCallHistoryById, updateCallHistory, deleteCallHistory } = require('../controllers/callHistoryController');
const router = express.Router();

router.post('/', createCallHistory);
router.get('/', getAllCallHistory);
router.get('/:id', getCallHistoryById);
router.put('/:id', updateCallHistory);
router.delete('/:id', deleteCallHistory);

module.exports = router;
