const mongoose = require('mongoose');

const leadSourcesSchema = new mongoose.Schema(
  {
    source_name: {
      type: String,
      required: true,
      unique: true,
      maxlength: 255,
      trim: true,
    },
    source_description: {
      type: String,
      default: null,
      maxlength: 255,
      trim: true,
    },
    created_by: {
      type: mongoose.Schema.Types.BigInt,
      required: true,
      ref: 'User', 
    },
    branch_id: {
      type: mongoose.Schema.Types.BigInt,
      required: true,
      ref: 'Branch', 
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
  },
  {
    timestamps: true, 
    versionKey: false, 
  }
);

// Create the model
const LeadSource = mongoose.model('LeadSource', leadSourcesSchema);

module.exports = LeadSource;
