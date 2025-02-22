const express = require('express');
const router = express.Router();
const {createCompanyDetail,getAllCompanyDetails,getCompanyDetailById,updateCompanyDetail,deleteCompanyDetail,} = require('../controllers/companyDetailsController');

router.post('/companyDetails', createCompanyDetail);
router.get('/companyDetails', getAllCompanyDetails);
router.get('/companyDetails/:id', getCompanyDetailById);
router.put('/companyDetails/:id', updateCompanyDetail);
router.delete('/companyDetails/:id', deleteCompanyDetail);

module.exports = router;
