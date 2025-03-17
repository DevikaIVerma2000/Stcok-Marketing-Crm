const mongoose = require('mongoose');

const migrationSchema = new mongoose.Schema({
  migration: {
    type: String,
    required: true,
    maxlength: 255,
  },
  batch: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true, 
});
    
const Migration = mongoose.model('Migration', migrationSchema);

module.exports = Migration;
