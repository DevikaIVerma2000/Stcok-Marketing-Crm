const express = require('express');
const UserDetailController = require('../controllers/userDetailController'); // Adjust the path as needed
const router = express.Router();

// Routes for UserDetail CRUD operations

// Create a new user detail
router.post('/user-details', UserDetailController.createUserDetail);

// Get all user details
router.get('/user-details', UserDetailController.getAllUserDetails);

// Get a single user detail by ID
router.get('/user-details/:id', UserDetailController.getUserDetailById);

// Update a user detail by ID
router.put('/user-details/:id', UserDetailController.updateUserDetail);

// Delete a user detail by ID
router.delete('/user-details/:id', UserDetailController.deleteUserDetail);

module.exports = router;
