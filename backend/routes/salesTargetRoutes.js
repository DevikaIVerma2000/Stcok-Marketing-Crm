const express = require('express');
const {createSalesTarget,getAllSalesTargets,getSalesTargetById,updateSalesTarget,deleteSalesTarget,} = require('../controllers/salesTargetController');
const router = express.Router();

router.post('/salesTargets', createSalesTarget);
router.get('/salesTargets', getAllSalesTargets);
router.get('/salesTargets/:id', getSalesTargetById);
router.put('/salesTargets/:id', updateSalesTarget);
router.delete('/salesTargets/:id', deleteSalesTarget);

module.exports = router;
