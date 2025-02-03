const mongoose = require('mongoose');

const packageUserSchema = new mongoose.Schema(
  {
    customer_package_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package', 
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('PackageUser', packageUserSchema);
