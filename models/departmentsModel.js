const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
  department_name: {
    type: String,
    required: true,
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  branch_id: {
    type: Schema.Types.ObjectId,
    ref: 'Branch', 
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
});

const Department = mongoose.model('Department', departmentSchema);
module.exports = Department;
