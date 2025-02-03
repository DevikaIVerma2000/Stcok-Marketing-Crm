const Shift = require('../models/shiftsModel');

// Create a new shift
const createShift = async (req, res) => {
  try {
    const newShift = new Shift(req.body);
    await newShift.save();
    res.status(201).json({
      success: true,
      message: 'Shift created successfully',
      data: newShift,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating shift',
      error: error.message,
    });
  }
};

// Get all shifts
const getAllShifts = async (req, res) => {
  try {
    const shifts = await Shift.find()
      .populate('branch_id', 'name') 
      .populate('created_by', 'username'); 

    res.status(200).json({
      success: true,
      message: 'Shifts retrieved successfully',
      data: shifts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching shifts',
      error: error.message,
    });
  }
};

// Get shift by ID
const getShiftById = async (req, res) => {
  try {
    const { id } = req.params;
    const shift = await Shift.findById(id)
      .populate('branch_id', 'name')
      .populate('created_by', 'username');

    if (!shift) {
      return res.status(404).json({
        success: false,
        message: 'Shift not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Shift retrieved successfully',
      data: shift,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching shift',
      error: error.message,
    });
  }
};

// Update shift by ID
const updateShift = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedShift = await Shift.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedShift) {
      return res.status(404).json({
        success: false,
        message: 'Shift not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Shift updated successfully',
      data: updatedShift,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating shift',
      error: error.message,
    });
  }
};

// Delete shift by ID
const deleteShift = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedShift = await Shift.findByIdAndDelete(id);

    if (!deletedShift) {
      return res.status(404).json({
        success: false,
        message: 'Shift not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Shift deleted successfully',
      data: deletedShift,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting shift',
      error: error.message,
    });
  }
};

module.exports = {
  createShift,
  getAllShifts,
  getShiftById,
  updateShift,
  deleteShift,
};
