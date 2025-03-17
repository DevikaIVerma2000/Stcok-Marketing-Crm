const express = require('express');
const {  createAttendanceLegend,getAllAttendanceLegends,getAttendanceLegendById,updateAttendanceLegend,deleteAttendanceLegend} = require('../controllers/attendanceLegendController');
const router = express.Router();

router.post('/', createAttendanceLegend);
router.get('/', getAllAttendanceLegends);
router.get('/:id', getAttendanceLegendById);
router.put('/:id', updateAttendanceLegend);
router.delete('/:id', deleteAttendanceLegend);


module.exports = router;
