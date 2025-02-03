const mongoose = require('mongoose');

const customerBranchesSchema = new mongoose.Schema({
  customer_id: {
    type: Number,
    required: true,
    index: true,
  },
  branch_id: {
    type: Number,
    required: true,
    index: true,
  },
  user_id: {
    type: Number,
    required: true,
    index: true,
  },
  created_by: {
    type: Number,
    required: true,
    index: true,
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
  }
});

module.exports = mongoose.model('CustomerBranch', customerBranchesSchema);
