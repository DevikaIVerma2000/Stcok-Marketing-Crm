const mongoose = require('mongoose');

const salesTargetSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  month: {
    type: Number,
    default: null,
  },
  year: {
    type: Number,
    default: null,
  },
  target: {
    type: mongoose.Schema.Types.Decimal128,
    default: null,
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
