const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  emp_id: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  first_name: String,
  middle_name: String,
  last_name: String,
  full_name: {
    type: String,
    required: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  primary_contact: {
    type: String,
    required: true,
    unique: true,
  },
  secondary_contact: String,
  emergency_contact_name: String,
  emergency_contact_relation: String,
  emergency_contact: String,
  date_of_birth: Date,
  address: String,
  city: String,
  state: String,
  pincode: String,
  country: String,
  alt_address: String,
  alt_city: String,
  alt_state: String,
  alt_pincode: String,
  gender: String,
  marital_status: {
    type: String,
    enum: ['Married', 'Single', 'Widowed', 'Divorced'],
  },
  bank_name: String,
  bank_ifsc_code: String,
  bank_account_number: String,
  bank_proof_url: String,
  pan_number: String,
  pan_proof_url: String,
  aadhaar_card: String,
  aadhaar_proof_url: String,
  blood_group: String,
  photo_url: String,
  branch_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',
    index: true,
  },
  monthly_target: {
    type: Number,
    default: 0,
  },
  user_status: {
    type: String,
    default: 'active',
  },
  created_by: {
    type: Number,
    default: null,
  },
  updated_by: {
    type: Number,
    default: null,
  },
  deleted_at: {
    type: Date,
    default: null,
  },
}, {
  timestamps: true,  
  versionKey: false,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
