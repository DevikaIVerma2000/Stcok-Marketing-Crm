const express = require('express');
const router = express.Router();
const complianceRecordsController = require('../controllers/complianceRecordsController');

router.post('/complianceRecords', complianceRecordsController.createComplianceRecord);
router.get('/complianceRecords', complianceRecordsController.getAllComplianceRecords);
router.get('/complianceRecords/:id', complianceRecordsController.getComplianceRecordById);
router.put('/complianceRecords/:id', complianceRecordsController.updateComplianceRecord);
router.delete('/complianceRecords/:id', complianceRecordsController.deleteComplianceRecord);

module.exports = router;
