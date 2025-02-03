const mongoose = require('mongoose');

const customerPackagesSchema = new mongoose.Schema({
    customer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer', 
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    package_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
        required: true
    },
    enrollment_date: {
        type: Date,
        required: true
    },
    expiry_date: {
        type: Date,
        required: true
    },
    package_amount: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    discount_amount: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    payable_amount: {
        type: mongoose.Schema.Types.Decimal128,
        required: true
    },
    paid_amount: {
        type: mongoose.Schema.Types.Decimal128,
        default: 0.00
    },
    notes: {
        type: String,
        default: null
    },
    approval_status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    approved_by_user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        default: null
    },
    approval_notes: {
        type: String,
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    deleted_at: {
        type: Date,
        default: null
    }
}, { timestamps: true });


const CustomerPackages = mongoose.model('CustomerPackages', customerPackagesSchema);

module.exports = CustomerPackages;
