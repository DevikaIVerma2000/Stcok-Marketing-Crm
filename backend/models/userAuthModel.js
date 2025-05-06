const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userAuthSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  wrong_attempts: {
    type: Number,
    default: 0,
  },
  emp_access_status: {
    type: String,
    default: 'active',
    enum: ['active', 'inactive', 'suspended' , 'disable'], 
  },
  login_status: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
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


const UserAuth = mongoose.model('UserAuth', userAuthSchema);

module.exports = UserAuth;
