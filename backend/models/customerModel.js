const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    suffix: {
      type: String,
      required: false,
    },
    first_name: {
      type: String,
      required: true,
    },
    middle_name: {
      type: String,
      required: false,
    },
    last_name: {
      type: String,
      required: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    company_name: {
      type: String,
      required: false,
    },
    primary_contact: {
      type: String,
      required: true,
    },
    secondary_contact: {
      type: String,
      required: false,
    },
    email_id: {
      type: String,
      required: true,
    },
    date_of_birth: {
      type: Date,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    zipcode: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
      default: "INDIA",
    },
    pancard: {
      type: String,
      required: false,
    },
    pan_proof_url: {
      type: String,
      required: false,
    },
    aadhaar_card: {
      type: String,
      required: false,
    },
    aadhaar_proof_url: {
      type: String,
      required: false,
    },
    kyc_status: {
      type: Number,
      required: false,
      default: 0,
    },
    compliance_status: {
      type: Number,
      required: false,
      default: 0,
    },
    gst_number: {
      type: String,
      required: false,
    },
    gst_number_url: {
      type: String,
      required: false,
    },
    welcome_email_status: {
      type: Number,
      required: false,
      default: 0,
    },
    dnc: {
      type: Number,
      required: false,
      default: 0,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',  
      required: true
    },
    deleted_at: {
      type: Date,
      required: false,
      default: null,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
