const mongoose = require('mongoose');
const SalesTarget = require('../models/salesTargetModel');

// Create a new sales target
const createSalesTarget = async (req, res) => {
  try {
    const { user_id, month, year, target, achieved } = req.body;

    if (!user_id || !month || !year || !target) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
      });
    }

    const newSalesTarget = new SalesTarget({
      user_id,
      month,
      year,
      target: mongoose.Types.Decimal128.fromString(target.toString()),
      achieved: achieved ? mongoose.Types.Decimal128.fromString(achieved.toString()) : null,
    });

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
    const salesTargets = await SalesTarget.find().populate('user_id', 'name email'); 
    res.status(200).json({
      success: true,
      message: 'Sales targets retrieved successfully',
      data: salesTargets.map(target => ({
        ...target._doc,
        target: parseFloat(target.target.toString()),
        achieved: target.achieved ? parseFloat(target.achieved.toString()) : 0,
      })),
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
    const salesTarget = await SalesTarget.findById(id).populate('user_id', 'name email');

    if (!salesTarget) {
      return res.status(404).json({
        success: false,
        message: 'Sales target not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Sales target retrieved successfully',
      data: {
        ...salesTarget._doc,
        target: parseFloat(salesTarget.target.toString()),
        achieved: salesTarget.achieved ? parseFloat(salesTarget.achieved.toString()) : 0,
      },
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
    const updates = { ...req.body };

    if (updates.target) {
      updates.target = mongoose.Types.Decimal128.fromString(updates.target.toString());
    }
    if (updates.achieved) {
      updates.achieved = mongoose.Types.Decimal128.fromString(updates.achieved.toString());
    }

    const updatedSalesTarget = await SalesTarget.findByIdAndUpdate(id, updates, {
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
      data: {
        ...updatedSalesTarget._doc,
        target: parseFloat(updatedSalesTarget.target.toString()),
        achieved: updatedSalesTarget.achieved ? parseFloat(updatedSalesTarget.achieved.toString()) : 0,
      },
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
