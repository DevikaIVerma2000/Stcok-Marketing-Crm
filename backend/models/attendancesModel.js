const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    shift_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shift', 
      required: true,
    },
    attendance_legend_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AttendanceLegend', 
      required: true,
    },
    attendance_legend_code: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    login_time: {
      type: Date,
      default: null,
    },
    logout_time: {
      type: Date,
      default: null,
    },
    total_working_hours: {
      type: Number,
      default: null,
    },
    paid_no_of_days: {
      type: Number,
      required: true,
    },
    regularization_reason: {
      type: String,
      default: null,
    },
    regularization_status: {
      type: String,
      default: null,
    },
    regularization_approved_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      default: null,
    },
    ip_address: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Attendance', attendanceSchema);
