const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  primary_contact: { type: String, required: true },
  secondary_contact: { type: String, default: null },
  email_id: { type: String, default: null },
  date_of_birth: { type: Date, default: null },
  address: { type: String, default: null },
  city: { type: String, default: null },
  state: { type: String, default: null },
  zipcode: { type: String, default: null },
  country: { type: String, default: null },
  language: { type: String, default: null },
  segment: { type: String, default: null },
  trading_budget: { type: String, default: null },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  source_id: { type: mongoose.Schema.Types.ObjectId, ref: 'LeadSource', required: true },
  agency_id: { type: mongoose.Schema.Types.ObjectId, ref: 'MarketingAgency', required: true },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  priority: { type: String, default: null },
  called_count: { type: Number, default: 0 },
  call_status_code: { type: String, default: 'NEW' },
  dnc: { type: Boolean, default: false },
  notes: { type: String, default: null },
  dup_count: { type: Number, default: 0 },
  dup_status: { type: Boolean, default: false },
  follow_up_date: { type: Date, default: null },
  reassign_datetime: { type: Date, default: null },
  reset_datetime: { type: Date, default: null },
  notify_email: { type: Boolean, default: false },
  updated_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  branch_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
  deleted: { type: Boolean, default: false }  
}, { timestamps: true, versionKey: false });

const Lead = mongoose.model('Lead', leadSchema);
module.exports = Lead;
