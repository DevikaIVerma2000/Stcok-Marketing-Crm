const express = require('express');
const router = express.Router();
const {createCallStatus,getAllCallStatuses,getCallStatusById,updateCallStatus,deleteCallStatus} = require('../controllers/callStatusesController');

router.post('/', createCallStatus);
router.get('/', getAllCallStatuses);
router.get('/:id', getCallStatusById);
router.put('/:id', updateCallStatus);
router.delete('/:id', deleteCallStatus);

module.exports = router;
