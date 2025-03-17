const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const designationSchema = new Schema({
  designation_name: {
    type: String,
    required: true,
  },
  department_id: {
    type: Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
  },
  branch_id: {
    type: Schema.Types.ObjectId,
    ref: 'Branch',
    required: true,
  },
  created_by: {
    type: Schema.Types.ObjectId,
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
});

const Designation = mongoose.model('Designation', designationSchema);
module.exports = Designation;
