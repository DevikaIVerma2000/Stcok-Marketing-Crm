const mongoose = require('mongoose');

const callStatusesSchema = new mongoose.Schema(
  {
    call_status_code: {
      type: String,
      maxlength: 255,
      required: true,
    },
    call_status_name: {
      type: String,
      maxlength: 255,
      required: true,
    },
    active: {
      type: String,
      enum: ['Y', 'N'],
      required: true,
      default: 'Y', 
    },
    admin_only: {
      type: String,
      enum: ['Y', 'N'],
      required: true,
      default: 'N',
    },
    selectable: {
      type: String,
      enum: ['Y', 'N'],
      required: true,
      default: 'Y', 
    },
    not_reachable: {
      type: String,
      enum: ['Y', 'N'],
      required: true,
      default: 'N', 
    },
    human_answered: {
      type: String,
      enum: ['Y', 'N'],
      required: true,
      default: 'N', 
    },
    sale: {
      type: String,
      enum: ['Y', 'N'],
      required: true,
      default: 'N', 
    },
    dnc: {
      type: String,
      enum: ['Y', 'N'],
      required: true,
      default: 'N', 
    },
    customer_contact: {
      type: String,
      enum: ['Y', 'N'],
      required: true,
      default: 'N', 
    },
    not_interested: {
      type: String,
      enum: ['Y', 'N'],
      required: true,
      default: 'N', 
    },
    unworkable: {
      type: String,
      enum: ['Y', 'N'],
      required: true,
      default: 'N', 
    },
    scheduled_callback: {
      type: String,
      enum: ['Y', 'N'],
      required: true,
      default: 'N', 
    },
    completed: {
      type: String,
      enum: ['Y', 'N'],
      required: true,
      default: 'N', 
    },
    follow_up: {
      type: String,
      enum: ['Y', 'N'],
      required: true,
      default: 'N',
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      default: null,
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

module.exports = mongoose.model('CallStatus', callStatusesSchema);
