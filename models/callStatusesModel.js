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
      enum: ["Yes", "No"],
      default: "Yes",
    },
    admin_only: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    selectable: {
      type: String,
      enum: ["Yes", "No"],
      default: "Yes",
    },
    not_reachable: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    human_answered: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    sale: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    dnc: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    customer_contact: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    not_interested: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    unworkable: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    scheduled_callback: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    completed: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
    follow_up: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
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
