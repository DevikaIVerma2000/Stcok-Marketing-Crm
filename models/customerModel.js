const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
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
  email_id: {
    type: String,
    required: true,
    unique: true,
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
}, {
  timestamps: true 
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
