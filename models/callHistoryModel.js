const mongoose = require('mongoose');

const callHistorySchema = new mongoose.Schema(
  {
    lead_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lead', 
      required: true,
    },
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer', 
      required: true,
    },
    compliance_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ComplianceRecords', 
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    call_status_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CallStatus',
      required: true,
    },
    notes: {
      type: String,
      maxlength: 255, 
      default: null,
    },
    recording_url: {
      type: String,
      maxlength: 255,
      default: null,
    },
    follow_up_date: {
      type: Date,
      default: null,
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

module.exports = mongoose.model('CallHistory', callHistorySchema);
