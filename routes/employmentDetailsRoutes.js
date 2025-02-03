const express = require('express');
const {  getAllEmploymentDetails,  getEmploymentDetailById, createEmploymentDetail, updateEmploymentDetail, deleteEmploymentDetail } = require('../controllers/employmentDetailsController');
const router = express.Router();

router.get('/', getAllEmploymentDetails);
router.get('/:id', getEmploymentDetailById);
router.post('/', createEmploymentDetail);
router.put('/:id', updateEmploymentDetail);
router.delete('/:id', deleteEmploymentDetail);

module.exports = router;
