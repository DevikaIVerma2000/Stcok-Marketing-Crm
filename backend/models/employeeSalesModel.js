const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSalesSchema = new Schema({
  payment_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Payment',
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  team_id: {
    type: Schema.Types.ObjectId,
    ref: 'Team',
    default: null,
  },
  team_leader_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  parent_team_leader_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  sale_percentage: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  sale_amount: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  remarks: {
    type: String,
    default: null,
    trim: true,
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
});

const EmployeeSales = mongoose.model('EmployeeSales', employeeSalesSchema);
module.exports = EmployeeSales;
