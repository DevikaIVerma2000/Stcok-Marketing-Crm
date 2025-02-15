const express = require('express');
const { createAttendance,getAllAttendances,getAttendanceById,updateAttendance,deleteAttendance} = require('../controllers/attendanceController');
const router = express.Router();

router.post('/attendance', createAttendance);
router.get('/attendance', getAllAttendances);
router.get('/:id', getAttendanceById);
router.put('/:id', updateAttendance);
router.delete('/:id', deleteAttendance);

module.exports = router;
