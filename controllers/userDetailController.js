const UserDetail = require('../models/userDetailModel'); // Adjust the path as necessary

// Controller for UserDetail CRUD operations
const UserDetailController = {
  // Create a new user detail
  createUserDetail: async (req, res) => {
    try {
      const userDetail = new UserDetail(req.body);
      const savedUserDetail = await userDetail.save();
      res.status(201).json({ message: 'User detail created successfully', data: savedUserDetail });
    } catch (error) {
      res.status(500).json({ message: 'Error creating user detail', error: error.message });
    }
  },

  // Get all user details
  getAllUserDetails: async (req, res) => {
    try {
      const userDetails = await UserDetail.find().populate('roleId');
      res.status(200).json({ message: 'User details fetched successfully', data: userDetails });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user details', error: error.message });
    }
  },

  // Get a single user detail by ID
  getUserDetailById: async (req, res) => {
    try {
      const userDetail = await UserDetail.findById(req.params.id).populate('roleId');
      if (!userDetail) {
        return res.status(404).json({ message: 'User detail not found' });
      }
      res.status(200).json({ message: 'User detail fetched successfully', data: userDetail });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user detail', error: error.message });
    }
  },

  // Update a user detail by ID
  updateUserDetail: async (req, res) => {
    try {
      const updatedUserDetail = await UserDetail.findByIdAndUpdate(req.params.id, req.body, {
        new: true, // Return the updated document
        runValidators: true // Ensure validation rules are applied
      });
      if (!updatedUserDetail) {
        return res.status(404).json({ message: 'User detail not found' });
      }
      res.status(200).json({ message: 'User detail updated successfully', data: updatedUserDetail });
    } catch (error) {
      res.status(500).json({ message: 'Error updating user detail', error: error.message });
    }
  },

  // Delete a user detail by ID
  deleteUserDetail: async (req, res) => {
    try {
      const deletedUserDetail = await UserDetail.findByIdAndDelete(req.params.id);
      if (!deletedUserDetail) {
        return res.status(404).json({ message: 'User detail not found' });
      }
      res.status(200).json({ message: 'User detail deleted successfully', data: deletedUserDetail });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user detail', error: error.message });
    }
  }
};

module.exports = UserDetailController;
