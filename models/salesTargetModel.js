const mongoose = require('mongoose');

const salesTargetSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  target: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
  },
  achieved: {
    type: mongoose.Schema.Types.Decimal128,
    default: null,
  },
}, {
  timestamps: true, 
});

const SalesTarget = mongoose.model('SalesTarget', salesTargetSchema);

module.exports = SalesTarget;
