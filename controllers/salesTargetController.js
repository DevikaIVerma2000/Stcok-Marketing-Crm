const SalesTarget = require('../models/salesTargetModel');

// Create a new sales target
const createSalesTarget = async (req, res) => {
  try {
    const newSalesTarget = new SalesTarget(req.body);
    await newSalesTarget.save();
    res.status(201).json({
      success: true,
      message: 'Sales target created successfully',
      data: newSalesTarget,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating sales target',
      error: error.message,
    });
  }
};

// Get all sales targets
const getAllSalesTargets = async (req, res) => {
  try {
    const salesTargets = await SalesTarget.find();
    res.status(200).json({
      success: true,
      message: 'Sales targets retrieved successfully',
      data: salesTargets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching sales targets',
      error: error.message,
    });
  }
};

// Get sales target by ID
const getSalesTargetById = async (req, res) => {
  try {
    const { id } = req.params;
    const salesTarget = await SalesTarget.findById(id);

    if (!salesTarget) {
      return res.status(404).json({
        success: false,
        message: 'Sales target not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Sales target retrieved successfully',
      data: salesTarget,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching sales target',
      error: error.message,
    });
  }
};

// Update sales target by ID
const updateSalesTarget = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSalesTarget = await SalesTarget.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedSalesTarget) {
      return res.status(404).json({
        success: false,
        message: 'Sales target not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Sales target updated successfully',
      data: updatedSalesTarget,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating sales target',
      error: error.message,
    });
  }
};

// Delete sales target by ID
const deleteSalesTarget = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSalesTarget = await SalesTarget.findByIdAndDelete(id);

    if (!deletedSalesTarget) {
      return res.status(404).json({
        success: false,
        message: 'Sales target not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Sales target deleted successfully',
      data: deletedSalesTarget,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting sales target',
      error: error.message,
    });
  }
};

module.exports = {
  createSalesTarget,
  getAllSalesTargets,
  getSalesTargetById,
  updateSalesTarget,
  deleteSalesTarget,
};
