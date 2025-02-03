const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema(
  {
    shift_name: {
      type: String,
      required: true,
      maxlength: 50, 
    },
    shift_description: {
      type: String,
      maxlength: 100, 
      default: null,
    },
    shift_timing_start: {
      type: String, 
      required: true,
    },
    shift_timing_end: {
      type: String, 
      required: true,
    },
    shift_overide_enable: {
      type: Number, 
      required: true,
      default: 0,
    },
    working_hours_max: {
      type: Number,
      required: true,
    },
    min_full_day_working_hour: {
      type: Number, 
      required: true,
    },
    min_half_day_working_hour: {
      type: Number, 
      required: true,
    },
    late_mark_buffer_minutes: {
      type: Number,
      required: true,
    },
    late_mark_days_allowed: {
      type: Number, 
      required: true,
    },
    branch_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Branch', 
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
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

module.exports = mongoose.model('Shift', shiftSchema);
