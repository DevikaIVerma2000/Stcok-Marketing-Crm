const mongoose = require('mongoose');

const employmentDetailsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.BigInt,
    required: true,
    ref: 'User',
  },
  role_id: {
    type: mongoose.Schema.Types.BigInt,
    required: true,
    ref: 'Role',
  },
  department_id: {
    type: mongoose.Schema.Types.BigInt,
    required: true,
    ref: 'Department',
  },
  designation_id: {
    type: mongoose.Schema.Types.BigInt,
    required: true,
    ref: 'Designation',
  },
  ctc_salary: {
    type: mongoose.Schema.Types.BigInt,
    required: true,
  },
  employment_status: {
    type: String,
    required: true,
    default: 'active',
    maxlength: 25,
  },
  employment_status_description: {
    type: String,
    maxlength: 255,
  },
  employment_reason_for_change: {
    type: String,
    maxlength: 255,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
  },
  created_by: {
    type: mongoose.Schema.Types.BigInt,
    required: true,
    ref: 'User',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
  },
  deleted_at: {
    type: Date,
  },
});

const EmploymentDetails = mongoose.model('EmploymentDetails', employmentDetailsSchema);

module.exports = EmploymentDetails;
