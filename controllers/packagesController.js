const Package = require('../models/packagesModel');

// Create a new package
const createPackage = async (req, res) => {
  try {
    const newPackage = new Package(req.body);
    await newPackage.save();
    res.status(201).json({
      success: true,
      message: 'Package created successfully',
      data: newPackage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating package',
      error: error.message,
    });
  }
};

// Get all packages
const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.status(200).json({
      success: true,
      message: 'Packages retrieved successfully',
      data: packages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching packages',
      error: error.message,
    });
  }
};

// Get a package by ID
const getPackageById = async (req, res) => {
  try {
    const { id } = req.params;
    const package = await Package.findById(id);
    if (!package) {
      return res.status(404).json({
        success: false,
        message: 'Package not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Package retrieved successfully',
      data: package,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching package',
      error: error.message,
    });
  }
};

// Update a package by ID
const updatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPackage = await Package.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedPackage) {
      return res.status(404).json({
        success: false,
        message: 'Package not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Package updated successfully',
      data: updatedPackage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating package',
      error: error.message,
    });
  }
};

// Delete a package by ID
const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPackage = await Package.findByIdAndDelete(id);
    if (!deletedPackage) {
      return res.status(404).json({
        success: false,
        message: 'Package not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Package deleted successfully',
      data: deletedPackage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting package',
      error: error.message,
    });
  }
};

module.exports = {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
};
