const express = require('express');
const { createLead,getAllLeads,getLeadById,updateLead,deleteLead } = require('../controllers/leadController');
const router = express.Router();

router.post('/leads', createLead);
router.get('/leads', getAllLeads);
router.get('/leads/:id', getLeadById);
router.put('/leads/:id', updateLead);
router.delete('/leads/:id', deleteLead);

module.exports = router; 
