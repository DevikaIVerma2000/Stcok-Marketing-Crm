const CustomerPackages = require('../models/customerPackagesModel');

// Create a new customer package
const createCustomerPackage = async (req, res) => {
  try {
    const newPackage = new CustomerPackages(req.body);
    await newPackage.save();
    res.status(201).json({
      success: true,
      message: 'Customer package created successfully',
      data: newPackage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating customer package',
      error: error.message,
    });
  }
};

// Get all customer packages
const getAllCustomerPackages = async (req, res) => {
  try {
    const packages = await CustomerPackages.find();
    res.status(200).json({
      success: true,
      message: 'Customer packages retrieved successfully',
      data: packages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching customer packages',
      error: error.message,
    });
  }
};

// Get a customer package by ID
const getCustomerPackageById = async (req, res) => {
  try {
    const { id } = req.params;
    const customerPackage = await CustomerPackages.findById(id);
    if (!customerPackage) {
      return res.status(404).json({
        success: false,
        message: 'Customer package not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Customer package retrieved successfully',
      data: customerPackage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching customer package',
      error: error.message,
    });
  }
};

// Update a customer package by ID
const updateCustomerPackage = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPackage = await CustomerPackages.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedPackage) {
      return res.status(404).json({
        success: false,
        message: 'Customer package not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Customer package updated successfully',
      data: updatedPackage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating customer package',
      error: error.message,
    });
  }
};

// Delete a customer package by ID
const deleteCustomerPackage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPackage = await CustomerPackages.findByIdAndDelete(id);
    if (!deletedPackage) {
      return res.status(404).json({
        success: false,
        message: 'Customer package not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Customer package deleted successfully',
      data: deletedPackage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting customer package',
      error: error.message,
    });
  }
};

module.exports = {
  createCustomerPackage,
  getAllCustomerPackages,
  getCustomerPackageById,
  updateCustomerPackage,
  deleteCustomerPackage,
};
