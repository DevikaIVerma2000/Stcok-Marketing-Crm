const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companyDetailsSchema = new Schema({
  meta_name: {
    type: String,
    required: true,
  },
  meta_data: {
    type: String,
    required: true,
  },
  meta_description: {
    type: String,
    required: true,
  },
  meta_comment: {
    type: String,
    required: true,
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  status: {
    type: Number,
    default: 1, 
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

const CompanyDetails = mongoose.model('CompanyDetails', companyDetailsSchema);
module.exports = CompanyDetails;
