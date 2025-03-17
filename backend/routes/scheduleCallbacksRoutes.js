const express = require('express');
const {createScheduleCallback,getAllScheduleCallbacks,getScheduleCallbackById,updateScheduleCallback,deleteScheduleCallback} = require('../controllers/scheduleCallbacksController');
const router = express.Router();

router.post('/scheduleCallbacks', createScheduleCallback);
router.get('/scheduleCallbacks', getAllScheduleCallbacks);
router.get('/scheduleCallbacks/:id', getScheduleCallbackById);
router.put('/scheduleCallbacks/:id', updateScheduleCallback);
router.delete('/scheduleCallbacks/:id', deleteScheduleCallback);

module.exports = router;
