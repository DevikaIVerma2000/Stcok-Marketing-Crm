const mongoose = require('mongoose');

const attendanceLegendSchema = new mongoose.Schema(
  {
    legend_code: {
      type: String,
      required: true,
      unique: true,
      maxlength: 4, // Corresponding to varchar(4)
    },
    legend_name: {
      type: String,
      required: true,
      maxlength: 25, // Corresponding to varchar(25)
    },
    legend_description: {
      type: String,
      required: true,
      maxlength: 50, // Corresponding to varchar(50)
    },
    paid_no_of_days: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      required: true,
      default: 0, // Default value corresponding to tinyint(4)
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming 'User' model exists for 'created_by'
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
  { timestamps: true } // Automatically adds `created_at` and `updated_at`
);

module.exports = mongoose.model('AttendanceLegend', attendanceLegendSchema);
