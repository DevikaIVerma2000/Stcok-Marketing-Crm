  const Attendance = require('../models/attendancesModel');

  // Create a new attendance record
  const createAttendance = async (req, res) => {
    try {
      const newAttendance = new Attendance(req.body);
      await newAttendance.save();
      res.status(201).json({
        success: true,
        message: 'Attendance record created successfully',
        data: newAttendance,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating attendance record',
        error: error.message,
      });
    }
  };

  // Get all attendance records
  const getAllAttendances = async (req, res) => {
    try {
      const attendances = await Attendance.find()
        .populate('user_id', 'username') 
        .populate('shift_id', 'shift_name') 
        .populate('attendance_legend_id', 'code') 
        .populate('regularization_approved_by', 'username'); 

      res.status(200).json({
        success: true,
        message: 'Attendance records retrieved successfully',
        data: attendances,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching attendance records',
        error: error.message,
      });
    }
  };

  // Get attendance record by ID
  const getAttendanceById = async (req, res) => {
    try {
      const { id } = req.params;
      const attendance = await Attendance.findById(id)
        .populate('user_id', 'username')
        .populate('shift_id', 'shift_name')
        .populate('attendance_legend_id', 'code')
        .populate('regularization_approved_by', 'username');

      if (!attendance) {
        return res.status(404).json({
          success: false,
          message: 'Attendance record not found',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Attendance record retrieved successfully',
        data: attendance,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching attendance record',
        error: error.message,
      });
    }
  };

  // Update attendance record by ID
  const updateAttendance = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedAttendance = await Attendance.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!updatedAttendance) {
        return res.status(404).json({
          success: false,
          message: 'Attendance record not found',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Attendance record updated successfully',
        data: updatedAttendance,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating attendance record',
        error: error.message,
      });
    }
  };

  // Delete attendance record by ID
  const deleteAttendance = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedAttendance = await Attendance.findByIdAndDelete(id);

      if (!deletedAttendance) {
        return res.status(404).json({
          success: false,
          message: 'Attendance record not found',
        });
      }

      res.status(200).json({
        success: true,
        message: 'Attendance record deleted successfully',
        data: deletedAttendance,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting attendance record',
        error: error.message,
      });
    }
  };

  module.exports = {
    createAttendance,
    getAllAttendances,
    getAttendanceById,
    updateAttendance,
    deleteAttendance,
  };
