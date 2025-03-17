const mongoose = require('mongoose');

const packagesSchema = new mongoose.Schema(
  {
    package_name: {
      type: String,
      required: true,
    },
    package_amount: {
      type: Number,  
      default: null,
    },
    package_validity: {
      type: Number,
      required: true,
    },
    package_start_date: {
      type: Date,
      default: null,
    },
    package_end_date: {
      type: Date,
      default: null,
    },
    notes: {
      type: String,
      default: null,
    },
    package_status: {
      type: String,
      enum: ['Active', 'Inactive', 'Expired'], 
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      default: null,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model('Package', packagesSchema);
