const express = require('express');
const {createCustomer,getAllCustomers,getCustomerById,updateCustomer,deleteCustomer,} = require('../controllers/customerController');
const { requireAuth } = require('../middlewares/userMiddleware');
const router = express.Router();

router.post('/customers',requireAuth, createCustomer); 
router.get('/customers',requireAuth, getAllCustomers); 
router.get('/customers/:id',requireAuth, getCustomerById); 
router.put('/customers/:id',requireAuth, updateCustomer); 
router.delete('/customers/:id',requireAuth, deleteCustomer);

module.exports = router;
