const express = require('express');
const { createPackage, getAllPackages, getPackageById, updatePackage, deletePackage } = require('../controllers/packagesController');
const router = express.Router();

router.post('/packages', createPackage);
router.get('/packages', getAllPackages);
router.get('/packages/:id', getPackageById);
router.put('/packages/:id', updatePackage);
router.delete('/packages/:id', deletePackage);

module.exports = router;
