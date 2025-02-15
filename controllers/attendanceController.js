const mongoose = require('mongoose');
const Attendance = require('../models/attendancesModel');


const createAttendance = async (req, res) => {
  try {
    const { 
      user_id, 
      shift_id, 
      attendance_legend_id, 
      attendance_legend_code, 
      date, 
      login_time, 
      logout_time, 
      total_working_hours, 
      paid_no_of_days, 
      regularization_reason, 
      regularization_status, 
      regularization_approved_by 
    } = req.body;

    // Validate required fields
    if (!user_id || !shift_id || !attendance_legend_id || !attendance_legend_code || !date || !paid_no_of_days) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Validate MongoDB Object IDs
    if (![user_id, shift_id, attendance_legend_id, regularization_approved_by].every(id => mongoose.Types.ObjectId.isValid(id))) {
      return res.status(400).json({ success: false, message: "Invalid Object ID" });
    }

    // Validate date format
    if (isNaN(Date.parse(date))) {
      return res.status(400).json({ success: false, message: "Invalid date format" });
    }

    // Validate non-negative numbers
    if (paid_no_of_days < 0 || (total_working_hours && total_working_hours < 0)) {
      return res.status(400).json({ success: false, message: "Negative values not allowed" });
    }

    // Auto-fetch IP address
    const ip_address = req.ip || req.connection.remoteAddress;

    const newAttendance = new Attendance({
      user_id,
      shift_id,
      attendance_legend_id,
      attendance_legend_code,
      date,
      login_time,
      logout_time,
      total_working_hours,
      paid_no_of_days,
      regularization_reason,
      regularization_status,
      regularization_approved_by,
      ip_address
    });

    await newAttendance.save();
    res.status(201).json({ success: true, message: "Attendance recorded successfully", data: newAttendance });

  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating attendance record", error: error.message });
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

    res.status(200).json({ success: true, message: "Attendance records retrieved successfully", data: attendances });

  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching attendance records", error: error.message });
  }
};

// Get attendance by ID with validation
const getAttendanceById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Attendance ID" });
    }

    const attendance = await Attendance.findById(id)
      .populate('user_id', 'username')
      .populate('shift_id', 'shift_name')
      .populate('attendance_legend_id', 'code')
      .populate('regularization_approved_by', 'username');

    if (!attendance) {
      return res.status(404).json({ success: false, message: "Attendance record not found" });
    }

    res.status(200).json({ success: true, message: "Attendance record retrieved successfully", data: attendance });

  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching attendance record", error: error.message });
  }
};

// Update attendance with validation
const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Attendance ID" });
    }

    const updatedAttendance = await Attendance.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedAttendance) {
      return res.status(404).json({ success: false, message: "Attendance record not found" });
    }

    res.status(200).json({ success: true, message: "Attendance record updated successfully", data: updatedAttendance });

  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating attendance record", error: error.message });
  }
};

// Delete attendance with validation
const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Attendance ID" });
    }

    const deletedAttendance = await Attendance.findByIdAndDelete(id);

    if (!deletedAttendance) {
      return res.status(404).json({ success: false, message: "Attendance record not found" });
    }

    res.status(200).json({ success: true, message: "Attendance record deleted successfully", data: deletedAttendance });

  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting attendance record", error: error.message });
  }
};

module.exports = {
  createAttendance,
  getAllAttendances,
  getAttendanceById,
  updateAttendance,
  deleteAttendance
};
