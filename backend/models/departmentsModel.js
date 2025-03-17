const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  department_name: {
    type: String,
    required: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
  },
  branch_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch', 
    required: true,
  },
  deleted_at: {
    type: Date,
    default: null,
  },
}, { timestamps: true }); 

const Department = mongoose.model('Department', departmentSchema);
module.exports = Department;
