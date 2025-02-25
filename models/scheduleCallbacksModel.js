const mongoose = require('mongoose');

// Schedule Callback Schema
const scheduleCallbackSchema = new mongoose.Schema({
  lead_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lead',  
    default: null,
  },
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer', 
    default: null,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  
    required: true,
  },
  callback_status: {
    type: String,
    required: true,
    enum: ['Pending', 'Completed', 'Missed'], 
    default: 'Pending',
  },
  callback_time: {
    type: Date,
    required: true,
  },
  alert: {
    type: Number,
    default: 1,
  },
  comments: {
    type: String,
    default: null,
  },
}, {
  timestamps: true, 
});

const ScheduleCallback = mongoose.model('ScheduleCallback', scheduleCallbackSchema);

module.exports = ScheduleCallback;
