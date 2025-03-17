const mongoose = require('mongoose');

const authorizedDevicesSchema = new mongoose.Schema({
    device_name: { type: String, required: true },
    ip_address: { type: String, default: null }, 
    access_status: { type: String, required: true, maxlength: 15 },
    branch_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', required: true },
    active_date_time: { type: Date, default: Date.now },
    expiry_date_time: { type: Date, default: null },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    created_at: { type: Date, default: null },
    updated_at: { type: Date, default: null },
    deleted_at: { type: Date, default: null }
}, { timestamps: true });

const AuthorizedDevices = mongoose.model('AuthorizedDevices', authorizedDevicesSchema);

module.exports = AuthorizedDevices;
