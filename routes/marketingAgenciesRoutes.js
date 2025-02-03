const express = require('express');
const {createMarketingAgency,getAllMarketingAgencies,getMarketingAgencyById,updateMarketingAgency, deleteMarketingAgency,} = require('../controllers/marketingAgenciesController'); 
const router = express.Router();

router.post('/marketing-agencies', createMarketingAgency);
router.get('/marketing-agencies', getAllMarketingAgencies);
router.get('/marketing-agencies/:id', getMarketingAgencyById);
router.put('/marketing-agencies/:id', updateMarketingAgency);
router.delete('/marketing-agencies/:id', deleteMarketingAgency);

module.exports = router;
