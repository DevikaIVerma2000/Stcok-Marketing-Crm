const express = require('express');
const { createShift,  getAllShifts, getShiftById, updateShift, deleteShift } = require('../controllers/shiftController');
const router = express.Router();

router.post('/shifts', createShift);
router.get('/shifts', getAllShifts);
router.get('/shifts/:id', getShiftById);
router.put('/shifts/:id', updateShift);
router.delete('/shifts/:id', deleteShift);

module.exports = router;
