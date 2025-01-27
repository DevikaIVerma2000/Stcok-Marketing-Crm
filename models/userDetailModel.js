const mongoose = require('mongoose');

const userDetailSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNo: { type: String, required: true },
  address: { type: String },
  designation: { type: String },
  roleId: { 
    type: mongoose.Schema.Types.Number, 
    ref: 'RoleModel', 
    required: true
   },   
   createdBy: {
    type:String
  },
  createdOn: { type: Date, default: Date.now },
  isActiveId: { type: Boolean, default: true } 
});

// Create the model
const UserDetail = mongoose.model('UserDetail', userDetailSchema);

module.exports = UserDetail;
