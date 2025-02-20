const express = require('express');
const {  createPackageUser, getAllPackageUsers, getPackageUserById, updatePackageUser, deletePackageUser } = require('../controllers/packageUserController');
const router = express.Router();

router.post('/packageUsers', createPackageUser);
router.get('/packageUsers', getAllPackageUsers);
router.get('/packageUsers/:id', getPackageUserById);
router.put('/packageUsers/:id', updatePackageUser);
router.delete('/packageUsers/:id', deletePackageUser);

module.exports = router;
