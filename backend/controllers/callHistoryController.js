const CallHistory = require('../models/callHistoryModel');

// Create a new call history record
const createCallHistory = async (req, res) => {
  try {
    const newCallHistory = new CallHistory(req.body);
    await newCallHistory.save();
    res.status(201).json({
      success: true,
      message: 'Call history created successfully',
      data: newCallHistory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating call history',
      error: error.message,
    });
  }
};

// Get all call history records
const getAllCallHistory = async (req, res) => {
  try {
    const callHistory = await CallHistory.find()
      .populate('lead_id', 'name') 
      .populate('customer_id', 'name') 
      .populate('compliance_id', 'name') 
      .populate('user_id', 'username') 
      .populate('call_status_id', 'status'); 
    res.status(200).json({
      success: true,
      message: 'Call history retrieved successfully',
      data: callHistory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching call history',
      error: error.message,
    });
  }
};

// Get call history by ID
const getCallHistoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const callHistory = await CallHistory.findById(id)
      .populate('lead_id', 'name')
      .populate('customer_id', 'name')
      .populate('compliance_id', 'name')
      .populate('user_id', 'username')
      .populate('call_status_id', 'status');

    if (!callHistory) {
      return res.status(404).json({
        success: false,
        message: 'Call history not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Call history retrieved successfully',
      data: callHistory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching call history',
      error: error.message,
    });
  }
};

// Update call history by ID
const updateCallHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCallHistory = await CallHistory.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCallHistory) {
      return res.status(404).json({
        success: false,
        message: 'Call history not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Call history updated successfully',
      data: updatedCallHistory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating call history',
      error: error.message,
    });
  }
};

// Delete call history by ID
const deleteCallHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCallHistory = await CallHistory.findByIdAndDelete(id);

    if (!deletedCallHistory) {
      return res.status(404).json({
        success: false,
        message: 'Call history not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Call history deleted successfully',
      data: deletedCallHistory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting call history',
      error: error.message,
    });
  }
};

module.exports = {
  createCallHistory,
  getAllCallHistory,
  getCallHistoryById,
  updateCallHistory,
  deleteCallHistory,
};
