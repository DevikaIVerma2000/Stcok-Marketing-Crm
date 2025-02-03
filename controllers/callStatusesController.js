const CallStatus = require('../models/callStatusesModel');

// Create a new call status
const createCallStatus = async (req, res) => {
  try {
    const newCallStatus = new CallStatus(req.body);
    await newCallStatus.save();
    res.status(201).json({
      success: true,
      message: 'Call status created successfully',
      data: newCallStatus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating call status',
      error: error.message,
    });
  }
};

// Get all call statuses
const getAllCallStatuses = async (req, res) => {
  try {
    const callStatuses = await CallStatus.find()
      .populate('created_by', 'username')
      .populate('updated_by', 'username')
      .populate('branch_id', 'branch_name'); 
    res.status(200).json({
      success: true,
      message: 'Call statuses retrieved successfully',
      data: callStatuses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching call statuses',
      error: error.message,
    });
  }
};

// Get call status by ID
const getCallStatusById = async (req, res) => {
  try {
    const { id } = req.params;
    const callStatus = await CallStatus.findById(id)
      .populate('created_by', 'username')
      .populate('updated_by', 'username')
      .populate('branch_id', 'branch_name');

    if (!callStatus) {
      return res.status(404).json({
        success: false,
        message: 'Call status not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Call status retrieved successfully',
      data: callStatus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching call status',
      error: error.message,
    });
  }
};

// Update call status by ID
const updateCallStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCallStatus = await CallStatus.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCallStatus) {
      return res.status(404).json({
        success: false,
        message: 'Call status not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Call status updated successfully',
      data: updatedCallStatus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating call status',
      error: error.message,
    });
  }
};

// Delete call status by ID
const deleteCallStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCallStatus = await CallStatus.findByIdAndDelete(id);

    if (!deletedCallStatus) {
      return res.status(404).json({
        success: false,
        message: 'Call status not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Call status deleted successfully',
      data: deletedCallStatus,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting call status',
      error: error.message,
    });
  }
};

module.exports = {
  createCallStatus,
  getAllCallStatuses,
  getCallStatusById,
  updateCallStatus,
  deleteCallStatus,
};
