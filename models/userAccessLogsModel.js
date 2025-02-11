const mongoose = require('mongoose');

const userAccessLogsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  ip_address: {
    type: String,
    required: true,
  },
  authentication_status: {
    type: String,
    enum: ['SUCCESS', 'FAILED'],
    default: 'FAILED',
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
}, { timestamps: true });

const UserAccessLogs = mongoose.model('UserAccessLogs', userAccessLogsSchema);

module.exports = UserAccessLogs;
