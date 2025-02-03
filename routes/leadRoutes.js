const express = require('express');
const { createLead,getAllLeads,getLeadById,updateLead,deleteLead } = require('../controllers/leadController');
const router = express.Router();

router.post('/', createLead);
router.get('/', getAllLeads);
router.get('/:id', getLeadById);
router.put('/:id', updateLead);
router.delete('/:id', deleteLead);

module.exports = router;
