const express = require('express');
const UserDetailController = require('../controllers/userController'); 
const router = express.Router();

router.post('/user-details', UserDetailController.createUserDetail);
router.get('/user-details', UserDetailController.getAllUserDetails);
router.get('/user-details/:id', UserDetailController.getUserDetailById);
router.put('/user-details/:id', UserDetailController.updateUserDetail);
router.delete('/user-details/:id', UserDetailController.deleteUserDetail);

module.exports = router;
