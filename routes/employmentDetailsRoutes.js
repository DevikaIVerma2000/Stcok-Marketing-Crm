const express = require('express');
const {  getAllEmploymentDetails,  getEmploymentDetailById, createEmploymentDetail, updateEmploymentDetail, deleteEmploymentDetail } = require('../controllers/employmentDetailsController');
const router = express.Router();

router.get('/employmentDetails', getAllEmploymentDetails);
router.get('/employmentDetails/:id', getEmploymentDetailById);
router.post('/employmentDetails', createEmploymentDetail);
router.put('/employmentDetails/:id', updateEmploymentDetail);
router.delete('/employmentDetails/:id', deleteEmploymentDetail);

module.exports = router;
