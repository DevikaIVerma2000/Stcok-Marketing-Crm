const express = require('express');
const { createAttendance,getAllAttendances,getAttendanceById,updateAttendance,deleteAttendance} = require('../controllers/attendanceController');
const router = express.Router();

router.post('/attendance', createAttendance);
router.get('/attendance', getAllAttendances);
router.get('/attendance/:id', getAttendanceById);
router.put('/attendance/:id', updateAttendance);
router.delete('/attendance/:id', deleteAttendance);

module.exports = router;
