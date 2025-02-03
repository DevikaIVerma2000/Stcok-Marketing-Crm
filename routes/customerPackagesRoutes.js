const express = require('express');
const { createCustomerPackage, getAllCustomerPackages, getCustomerPackageById, updateCustomerPackage, deleteCustomerPackage } = require('../controllers/customerPackagesController');
const router = express.Router();

router.post('/', createCustomerPackage);
router.get('/', getAllCustomerPackages);
router.get('/:id', getCustomerPackageById);
router.put('/:id', updateCustomerPackage);
router.delete('/:id', deleteCustomerPackage);

module.exports = router;
