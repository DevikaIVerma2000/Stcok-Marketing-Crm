const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  team_name: {
    type: String,
    required: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  branch_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Branch',  
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'], 
    default: 'active',
  },
}, {
  timestamps: true, 
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
