const express = require('express');
const {createSalesTarget,getAllSalesTargets,getSalesTargetById,updateSalesTarget,deleteSalesTarget,} = require('../controllers/salesTargetController');
const router = express.Router();

router.post('/sales-targets', createSalesTarget);
router.get('/sales-targets', getAllSalesTargets);
router.get('/sales-targets/:id', getSalesTargetById);
router.put('/sales-targets/:id', updateSalesTarget);
router.delete('/sales-targets/:id', deleteSalesTarget);

module.exports = router;
