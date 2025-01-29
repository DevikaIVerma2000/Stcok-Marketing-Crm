const mongoose = require('mongoose');

const userDetailSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: { type: String, required: true },
  email: String,
  phoneNo: String,
  address: String,
  designation: String,
  roleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },  
  createdBy: String
});


const UserDetail = mongoose.model('UserDetail', userDetailSchema);

module.exports = UserDetail;