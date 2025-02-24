const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Customer',
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  team_leader_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TeamLeader',
    required: true,
  },
  parent_team_leader_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ParentTeamLeader',
    default: null,
  },
  customer_package_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'CustomerPackage',
  },
  payment_mode_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'PaymentMode',
  },
  payment_date: {
    type: Date,
    required: true,
  },
  gross_amount: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  tax_amount: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  gateway_charges: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  company_amount: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  analyst_charges: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  net_revenue_amount: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  status: {
    type: String,
    required: true,
    maxlength: 255,
  },
  email_status: {
    type: Boolean,
    default: false,
  },
  compliance_status: {
    type: Boolean,
    default: false,
  },
  approved_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  approved_date: {
    type: Date,
    default: null,
  },
  reference_id: {
    type: String,
    default: null,
  },
  notes: {
    type: String,
    default: null,
  },
}, {
  timestamps: true, 
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
