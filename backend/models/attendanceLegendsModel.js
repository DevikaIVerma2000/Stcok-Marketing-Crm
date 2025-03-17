const mongoose = require('mongoose');

const attendanceLegendSchema = new mongoose.Schema(
  {
    legend_code: {
      type: String,
      required: true,
      unique: true,
      maxlength: 4, 
    },
    legend_name: {
      type: String,
      required: true,
      maxlength: 25, 
    },
    legend_description: {
      type: String,
      required: true,
      maxlength: 50, 
    },
    paid_no_of_days: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      required: true,
      default: 0, 
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

module.exports = mongoose.model('AttendanceLegend', attendanceLegendSchema);
