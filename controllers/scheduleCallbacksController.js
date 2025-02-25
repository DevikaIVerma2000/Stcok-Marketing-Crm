const ScheduleCallback = require('../models/scheduleCallbacksModel');

// Create a new schedule callback
const createScheduleCallback = async (req, res) => {
  try {
    const { lead_id, customer_id, user_id, callback_status, callback_time, alert, comments } = req.body;

    if (!user_id) {
      return res.status(400).json({ success: false, message: 'User ID is required' });
    }

    const newScheduleCallback = new ScheduleCallback({
      lead_id: lead_id || null,
      customer_id: customer_id || null,
      user_id,
      callback_status,
      callback_time,
      alert,
      comments
    });

    await newScheduleCallback.save();
    res.status(201).json({ success: true, message: 'Schedule callback created successfully', data: newScheduleCallback });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating schedule callback', error: error.message });
  }
};

// Get all schedule callbacks (excluding soft-deleted ones)
const getAllScheduleCallbacks = async (req, res) => {
  try {
    const scheduleCallbacks = await ScheduleCallback.find({ deleted_at: null })
      .populate('lead_id', 'name') // Adjust field names based on your Lead model
      .populate('customer_id', 'name') // Adjust field names based on your Customer model
      .populate('user_id', 'username'); // Adjust field names based on your User model

    res.status(200).json({ success: true, message: 'Schedule callbacks retrieved successfully', data: scheduleCallbacks });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching schedule callbacks', error: error.message });
  }
};

// Get schedule callback by ID
const getScheduleCallbackById = async (req, res) => {
  try {
    const { id } = req.params;
    const scheduleCallback = await ScheduleCallback.findOne({ _id: id, deleted_at: null })
      .populate('lead_id', 'name')
      .populate('customer_id', 'name')
      .populate('user_id', 'username');

    if (!scheduleCallback) {
      return res.status(404).json({ success: false, message: 'Schedule callback not found' });
    }

    res.status(200).json({ success: true, message: 'Schedule callback retrieved successfully', data: scheduleCallback });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching schedule callback', error: error.message });
  }
};

// Update schedule callback by ID
const updateScheduleCallback = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedScheduleCallback = await ScheduleCallback.findOneAndUpdate(
      { _id: id, deleted_at: null },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedScheduleCallback) {
      return res.status(404).json({ success: false, message: 'Schedule callback not found' });
    }

    res.status(200).json({ success: true, message: 'Schedule callback updated successfully', data: updatedScheduleCallback });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating schedule callback', error: error.message });
  }
};

// Soft delete schedule callback by ID
const deleteScheduleCallback = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedScheduleCallback = await ScheduleCallback.findOneAndUpdate(
      { _id: id },
      { deleted_at: new Date() },
      { new: true }
    );

    if (!deletedScheduleCallback) {
      return res.status(404).json({ success: false, message: 'Schedule callback not found' });
    }

    res.status(200).json({ success: true, message: 'Schedule callback soft deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting schedule callback', error: error.message });
  }
};

module.exports = {
  createScheduleCallback,
  getAllScheduleCallbacks,
  getScheduleCallbackById,
  updateScheduleCallback,
  deleteScheduleCallback
};
