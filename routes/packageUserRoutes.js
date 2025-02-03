const express = require('express');
const {  createPackageUser, getAllPackageUsers, getPackageUserById, updatePackageUser, deletePackageUser } = require('../controllers/packageUserController');
const router = express.Router();

router.post('/package-users', createPackageUser);
router.get('/package-users', getAllPackageUsers);
router.get('/package-users/:id', getPackageUserById);
router.put('/package-users/:id', updatePackageUser);
router.delete('/package-users/:id', deletePackageUser);

module.exports = router;
