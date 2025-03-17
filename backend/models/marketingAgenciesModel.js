const mongoose = require('mongoose');

const marketingAgenciesSchema = new mongoose.Schema({
  agency_name: {
    type: String,
    required: true,
    maxlength: 255,
  },
  agency_description: {
    type: String,
    maxlength: 255,
    default: null,
  },
  branch_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
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

marketingAgenciesSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const MarketingAgency = mongoose.model('MarketingAgency', marketingAgenciesSchema);
module.exports = MarketingAgency;
