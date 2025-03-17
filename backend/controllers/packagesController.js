const Package = require('../models/packagesModel');

const createPackage = async (req, res) => {
  try {
    const { package_name, package_validity, package_status, branch_id } = req.body;

    // Check required fields
    if (!package_name || !package_validity || !package_status || !branch_id) {
      return res.status(400).json({
        success: false,
        message: 'package_name, package_validity, package_status, and branch_id are required',
      });
    }

    const validStatuses = ['Active', 'Inactive', 'Expired'];
    if (!validStatuses.includes(package_status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid package_status. Allowed values: ${validStatuses.join(', ')}`,
      });
    }

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

// Get all packages (excluding soft deleted ones)
const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find({ deleted_at: null });

    if (packages.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No packages found',
        data: [],
      });
    }

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
    const package = await Package.findOne({ _id: id, deleted_at: null });

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

    const existingPackage = await Package.findOne({ _id: id, deleted_at: null });
    if (!existingPackage) {
      return res.status(404).json({
        success: false,
        message: 'Package not found or has been deleted',
      });
    }

    const updatedPackage = await Package.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

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

// Soft Delete a package by ID
const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPackage = await Package.findByIdAndUpdate(
      id,
      { deleted_at: new Date() },
      { new: true }
    );

    if (!deletedPackage) {
      return res.status(404).json({
        success: false,
        message: 'Package not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Package soft deleted successfully',
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
