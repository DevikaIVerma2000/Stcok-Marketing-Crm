const express = require('express');
const {createScheduleCallback,getAllScheduleCallbacks,getScheduleCallbackById,updateScheduleCallback,deleteScheduleCallback} = require('../controllers/scheduleCallbacksController');
const router = express.Router();

router.post('/schedule-callbacks', createScheduleCallback);
router.get('/schedule-callbacks', getAllScheduleCallbacks);
router.get('/schedule-callbacks/:id', getScheduleCallbackById);
router.put('/schedule-callbacks/:id', updateScheduleCallback);
router.delete('/schedule-callbacks/:id', deleteScheduleCallback);

module.exports = router;
