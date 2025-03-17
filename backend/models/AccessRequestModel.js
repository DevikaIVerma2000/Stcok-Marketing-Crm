const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AccessRequestSchema = new Schema({
 
  user_id: { 
    type: Number, 
    required: true, 
    index: true 
  },

  request_type: { 
    type: String, 
    required: true 
  },


  target_id: { 
    type: Number, 
    required: true 
  },

  status: { 
    type: String, 
    enum: ['pending', 'approved', 'denied'], 
    default: 'pending',
    required: true 
  },

  created_at: { 
    type: Date, 
    default: Date.now 
  },


  updated_at: { 
    type: Date, 
    default: Date.now 
  },

  approved_by: { 
    type: Number, 
    default: null, 
    index: true 
  },


  approval_date: { 
    type: Date, 
    default: null 
  },


  notes: { 
    type: String, 
    default: null 
  }
});

AccessRequestSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});


module.exports = mongoose.model('AccessRequest', AccessRequestSchema);
