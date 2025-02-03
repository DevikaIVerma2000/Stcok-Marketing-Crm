const express = require('express');
const { createCustomerBranch, getAllCustomerBranches, getCustomerBranchById, updateCustomerBranch, deleteCustomerBranch } = require('../controllers/customerBranchesController');
const router = express.Router();

router.post('/', createCustomerBranch);
router.get('/', getAllCustomerBranches);
router.get('/:id', getCustomerBranchById);
router.put('/:id', updateCustomerBranch);
router.delete('/:id', deleteCustomerBranch);

module.exports = router;
