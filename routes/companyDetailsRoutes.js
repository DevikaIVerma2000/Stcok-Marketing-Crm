const express = require('express');
const router = express.Router();
const {createCompanyDetail,getAllCompanyDetails,getCompanyDetailById,updateCompanyDetail,deleteCompanyDetail,} = require('../controllers/companyDetailsController');

router.post('/', createCompanyDetail);
router.get('/', getAllCompanyDetails);
router.get('/:id', getCompanyDetailById);
router.put('/:id', updateCompanyDetail);
router.delete('/:id', deleteCompanyDetail);

module.exports = router;
