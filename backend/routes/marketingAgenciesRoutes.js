const express = require('express');
const {createMarketingAgency,getAllMarketingAgencies,getMarketingAgencyById,updateMarketingAgency, deleteMarketingAgency,} = require('../controllers/marketingAgenciesController'); 
const router = express.Router();

router.post('/marketingAgencies', createMarketingAgency);
router.get('/marketingAgencies', getAllMarketingAgencies);
router.get('/marketingAgencies/:id', getMarketingAgencyById);
router.put('/marketingAgencies/:id', updateMarketingAgency);
router.delete('/marketingAgencies/:id', deleteMarketingAgency);

module.exports = router;
