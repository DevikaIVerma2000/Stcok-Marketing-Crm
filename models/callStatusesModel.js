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
      type: Boolean,
      default: true,
    },
    admin_only: {
      type: Boolean,
      default: false,
    },
    selectable: {
      type: Boolean,
      default: true,
    },
    not_reachable: {
      type: Boolean,
      default: false,
    },
    human_answered: {
      type: Boolean,
      default: false,
    },
    sale: {
      type: Boolean,
      default: false,
    },
    dnc: {
      type: Boolean,
      default: false,
    },
    customer_contact: {
      type: Boolean,
      default: false,
    },
    not_interested: {
      type: Boolean,
      default: false,
    },
    unworkable: {
      type: Boolean,
      default: false,
    },
    scheduled_callback: {
      type: Boolean,
      default: false,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    follow_up: {
      type: Boolean,
      default: false,
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
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CallStatus', callStatusesSchema);
