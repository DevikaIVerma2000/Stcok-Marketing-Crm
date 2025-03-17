const mongoose = require('mongoose');

const leadSourcesSchema = new mongoose.Schema(
  {
    source_name: {
      type: String,
      required: true, 
    },
    source_description: {
      type: String,
      default: null,
      maxlength: 255,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    branch_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Branch',
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

const LeadSource = mongoose.model('LeadSource', leadSourcesSchema);

module.exports = LeadSource;
