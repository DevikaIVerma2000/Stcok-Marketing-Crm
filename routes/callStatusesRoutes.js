const express = require('express');
const router = express.Router();
const {createCallStatus,getAllCallStatuses,getCallStatusById,updateCallStatus,deleteCallStatus} = require('../controllers/callStatusesController');

router.post('/callStatuses', createCallStatus);
router.get('/callStatuses', getAllCallStatuses);
router.get('/callStatuses/:id', getCallStatusById);
router.put('/callStatuses/:id', updateCallStatus);
router.delete('/callStatuses/:id', deleteCallStatus);

module.exports = router;
