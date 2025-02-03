const ScheduleCallback = require('../models/scheduleCallbacksModel');

// Create a new schedule callback
const createScheduleCallback = async (req, res) => {
  try {
    const newScheduleCallback = new ScheduleCallback(req.body);
    await newScheduleCallback.save();
    res.status(201).json({
      success: true,
      message: 'Schedule callback created successfully',
      data: newScheduleCallback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating schedule callback',
      error: error.message,
    });
  }
};

// Get all schedule callbacks
const getAllScheduleCallbacks = async (req, res) => {
  try {
    const scheduleCallbacks = await ScheduleCallback.find();
    res.status(200).json({
      success: true,
      message: 'Schedule callbacks retrieved successfully',
      data: scheduleCallbacks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching schedule callbacks',
      error: error.message,
    });
  }
};

// Get schedule callback by ID
const getScheduleCallbackById = async (req, res) => {
  try {
    const { id } = req.params;
    const scheduleCallback = await ScheduleCallback.findById(id);

    if (!scheduleCallback) {
      return res.status(404).json({
        success: false,
        message: 'Schedule callback not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Schedule callback retrieved successfully',
      data: scheduleCallback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching schedule callback',
      error: error.message,
    });
  }
};

// Update schedule callback by ID
const updateScheduleCallback = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedScheduleCallback = await ScheduleCallback.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedScheduleCallback) {
      return res.status(404).json({
        success: false,
        message: 'Schedule callback not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Schedule callback updated successfully',
      data: updatedScheduleCallback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating schedule callback',
      error: error.message,
    });
  }
};

// Delete schedule callback by ID
const deleteScheduleCallback = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedScheduleCallback = await ScheduleCallback.findByIdAndDelete(id);

    if (!deletedScheduleCallback) {
      return res.status(404).json({
        success: false,
        message: 'Schedule callback not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Schedule callback deleted successfully',
      data: deletedScheduleCallback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting schedule callback',
      error: error.message,
    });
  }
};

module.exports = {
  createScheduleCallback,
  getAllScheduleCallbacks,
  getScheduleCallbackById,
  updateScheduleCallback,
  deleteScheduleCallback,
};
