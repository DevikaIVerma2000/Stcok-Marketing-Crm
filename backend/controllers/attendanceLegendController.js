const AttendanceLegend = require('../models/attendanceLegendsModel');

// Create a new attendance legend
const createAttendanceLegend = async (req, res) => {
  try {
    const newLegend = new AttendanceLegend({
      legend_code: req.body.legend_code,
      legend_name: req.body.legend_name,
      legend_description: req.body.legend_description,
      paid_no_of_days: req.body.paid_no_of_days,
      status: req.body.status || 0, 
      created_by: req.body.created_by,
    });

    const savedLegend = await newLegend.save();
    res.status(201).json({
      success: true,
      message: 'Attendance legend created successfully',
      data: savedLegend,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating attendance legend',
      error: error.message,
    });
  }
};

// Get all attendance legends
const getAllAttendanceLegends = async (req, res) => {
  try {
    const legends = await AttendanceLegend.find()
      .populate('created_by', 'username') 
      .sort({ created_at: -1 }); 
    res.status(200).json({
      success: true,
      message: 'Attendance legends retrieved successfully',
      data: legends,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching attendance legends',
      error: error.message,
    });
  }
};

// Get attendance legend by ID
const getAttendanceLegendById = async (req, res) => {
  try {
    const { id } = req.params;
    const legend = await AttendanceLegend.findById(id).populate('created_by', 'username');

    if (!legend) {
      return res.status(404).json({
        success: false,
        message: 'Attendance legend not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Attendance legend retrieved successfully',
      data: legend,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching attendance legend',
      error: error.message,
    });
  }
};

// Update attendance legend by ID
const updateAttendanceLegend = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = { ...req.body, updated_at: Date.now() };

    const updatedLegend = await AttendanceLegend.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedLegend) {
      return res.status(404).json({
        success: false,
        message: 'Attendance legend not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Attendance legend updated successfully',
      data: updatedLegend,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating attendance legend',
      error: error.message,
    });
  }
};


const deleteAttendanceLegend = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLegend = await AttendanceLegend.findByIdAndUpdate(
      id,
      { deleted_at: Date.now() },
      { new: true }
    );

    if (!deletedLegend) {
      return res.status(404).json({
        success: false,
        message: 'Attendance legend not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Attendance legend marked as deleted',
      data: deletedLegend,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting attendance legend',
      error: error.message,
    });
  }
};

module.exports = {
  createAttendanceLegend,
  getAllAttendanceLegends,
  getAttendanceLegendById,
  updateAttendanceLegend,
  deleteAttendanceLegend,
};
