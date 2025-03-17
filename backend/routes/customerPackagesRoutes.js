const express = require('express');
const { createCustomerPackage, getAllCustomerPackages, getCustomerPackageById, updateCustomerPackage, deleteCustomerPackage } = require('../controllers/customerPackagesController');
const router = express.Router();

router.post('/customerPackages', createCustomerPackage);
router.get('/customerPackages', getAllCustomerPackages);
router.get('/customerPackages/:id', getCustomerPackageById);
router.put('/customerPackages/:id', updateCustomerPackage);
router.delete('/customerPackages/:id', deleteCustomerPackage);

module.exports = router;
