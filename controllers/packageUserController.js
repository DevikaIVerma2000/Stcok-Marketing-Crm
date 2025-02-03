const PackageUser = require('../models/packageUserModel');

// Create a new package-user association
const createPackageUser = async (req, res) => {
  try {
    const newPackageUser = new PackageUser(req.body);
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
      .populate('customer_package_id', 'package_name package_amount') // Example to populate Package details
      .populate('user_id', 'username'); // Example to populate User details
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
