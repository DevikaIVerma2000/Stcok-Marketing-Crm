const express = require('express');
const { createCustomerBranch, getAllCustomerBranches, getCustomerBranchById, updateCustomerBranch, deleteCustomerBranch } = require('../controllers/customerBranchesController');
const router = express.Router();

router.post('/customerBranches', createCustomerBranch);
router.get('/customerBranches', getAllCustomerBranches);
router.get('/customerBranches/:id', getCustomerBranchById);
router.put('/customerBranches/:id', updateCustomerBranch);  
router.delete('/customerBranches/:id', deleteCustomerBranch);

module.exports = router;
