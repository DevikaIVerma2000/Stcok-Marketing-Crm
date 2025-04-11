const mongoose = require("mongoose");

const employmentDetailsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  role_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Role",
  },
  department_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Department",
  },
  designation_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Designation",
  },
  ctc_salary: {
    type: Number,
    required: true,
  },
  employment_status: {
    type: String,
    maxlength: 25,
    default: null, 
  },
  employment_status_description: {
    type: String,
    maxlength: 255,
    default: null,
  },
  employment_reason_for_change: {
    type: String,
    maxlength: 255,
    default: null,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    default: null,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: null,
  },
  deleted_at: {
    type: Date,
    default: null,
  },
});

const EmploymentDetails = mongoose.model("EmploymentDetails", employmentDetailsSchema);

module.exports = EmploymentDetails;