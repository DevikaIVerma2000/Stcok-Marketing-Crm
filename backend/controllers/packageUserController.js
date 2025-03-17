const mongoose = require('mongoose');
const PackageUser = require('../models/packageUserModel');
const User = require('../models/userModel'); 
const Package = require('../models/packagesModel');

// Create a new package-user association
const createPackageUser = async (req, res) => {
  try {
    const { customer_package_id, user_id } = req.body;

    if (!customer_package_id || !user_id) {
      return res.status(400).json({
        success: false,
        message: 'Both customer_package_id and user_id are required',
      });
    }

    // Check if the user and package association already exists
    const existingPackageUser = await PackageUser.findOne({ customer_package_id, user_id });

    if (existingPackageUser) {
      return res.status(409).json({ 
        success: false,
        message: 'This user is already associated with the package',
      });
    }

    const newPackageUser = new PackageUser({ customer_package_id, user_id });
    await newPackageUser.save();
    
    res.status(201).json({
      success: true,
      message: 'Package-User association created successfully',
      data: newPackageUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating package-user association',
      error: error.message,
    });
  }
};


// Get all package-user associations
const getAllPackageUsers = async (req, res) => {
  try {
    const packageUsers = await PackageUser.find()
  .populate('customer_package_id')
  .populate('user_id');
    res.status(200).json({
      success: true,
      message: 'Package-User associations retrieved successfully',
      data: packageUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching package-user associations',
      error: error.message,
    });
  }
};



// Get package-user association by ID
const getPackageUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID format',
      });
    }

    const packageUser = await PackageUser.findById(id)
      .populate('customer_package_id', 'package_name package_amount')
      .populate('user_id', 'username');

    if (!packageUser) {
      return res.status(404).json({
        success: false,
        message: 'Package-User association not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Package-User association retrieved successfully',
      data: packageUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching package-user association',
      error: error.message,
    });
  }
};

// Update package-user association by ID
const updatePackageUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID format',
      });
    }

    const updatedPackageUser = await PackageUser.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedPackageUser) {
      return res.status(404).json({
        success: false,
        message: 'Package-User association not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Package-User association updated successfully',
      data: updatedPackageUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating package-user association',
      error: error.message,
    });
  }
};

// Delete package-user association by ID
const deletePackageUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid ID format',
      });
    }

    const deletedPackageUser = await PackageUser.findByIdAndDelete(id);

    if (!deletedPackageUser) {
      return res.status(404).json({
        success: false,
        message: 'Package-User association not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Package-User association deleted successfully',
      data: deletedPackageUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting package-user association',
      error: error.message,
    });
  }
};

module.exports = {
  createPackageUser,
  getAllPackageUsers,
  getPackageUserById,
  updatePackageUser,
  deletePackageUser,
};
