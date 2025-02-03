const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
  branch_code: { type: String, required: true },
  branch_emp_code: { type: String, required: true },
  branch_name: { type: String, required: true },
  owner_name: { type: String, default: null },
  primary_contact: { type: String, required: true },
  secondary_contact: { type: String, default: null },
  primary_email_id: { type: String, required: true },
  secondary_email_id: { type: String, default: null },
  gst_number: { type: String, default: null },
  date_of_inception: { type: Date, default: null },
  branch_account_details: { type: String, default: null },
  customer_payment_account_details: { type: String, default: null },
  address: { type: String, default: null },
  city: { type: String, default: null },
  state: { type: String, default: null },
  zipcode: { type: String, default: null },
  country: { type: String, default: null },
  branch_status: { type: String, required: true },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

branchSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const Branch = mongoose.model('Branch', branchSchema);

module.exports = Branch;
