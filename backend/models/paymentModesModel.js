const mongoose = require('mongoose');

const paymentModeSchema = new mongoose.Schema({
  payment_mode_name: {
    type: String,
    required: true,
  },
  fees_type: {
    type: String,
    default: null,
  },
  fees: {
    type: mongoose.Schema.Types.Decimal128,
    default: null,
  },
  notes: {
    type: String,
    default: null,
    maxlength: 255,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  updated_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  branch_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    required: true,
  },
}, {
  timestamps: true, 
});

const PaymentMode = mongoose.model('PaymentMode', paymentModeSchema);

module.exports = PaymentMode;
