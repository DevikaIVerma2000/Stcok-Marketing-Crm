const express = require('express');
const router = express.Router();
const {getAllInvoices,createInvoice,getInvoiceById,updateInvoice,deleteInvoice} = require('../controllers/invoicesController');

router.post('/invoices', createInvoice);       
router.get('/invoices', getAllInvoices);       
router.get('/invoices/:id', getInvoiceById);   
router.put('/invoices/:id', updateInvoice);   
router.delete('/invoices/:id', deleteInvoice);

module.exports = router;
