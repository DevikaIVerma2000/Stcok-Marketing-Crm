const mongoose = require('mongoose');

const packagesSchema = new mongoose.Schema(
  {
    package_name: {
      type: String,
      required: true,
    },
    package_amount: {
      type: mongoose.Schema.Types.Decimal128,
      required: false,
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

module.exports = mongoose.model('Package', packagesSchema);
