const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  proforma_date: {
    type: Date,
    required: true
  },
  invoice_number: {
    type: String,
    required: true
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  payment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment', 
    required: true
  },
  branch_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch', 
    required: true
  },
  particulars: {
    type: String,
    default: null
  },
  customer_data: {
    type: mongoose.Schema.Types.Mixed, 
    default: null 
  },
  company_data: {
    type: mongoose.Schema.Types.Mixed, 
    default: null
  },
  invoice_finalized: {
    type: Boolean,
    default: false
  },
  email_count: {
    type: Number,
    default: 0
  },
  finalized_date: {
    type: Date,
    default: null
  },
  finalized_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    default: null
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  deleted_at: {
    type: Date,
    default: null 
  }
}, { timestamps: true, versionKey: false });

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
