const Customer = require("../models/customerModel");
const CallStatuses = require("../models/callStatusesModel");
const CallHistory = require("../models/callHistoryModel");
const { getIndiaTime } = require("../utils/time");
const mongoose = require("mongoose");

const callHistorySchema = new mongoose.Schema(
  {
    lead_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lead',
      required: false,
      default: null,
    },
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Customer',
      required: false,
      default: null,
    },
    compliance_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ComplianceRecords',
      required: false,
      default: null,
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
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

module.exports = mongoose.model('CallHistory', callHistorySchema);