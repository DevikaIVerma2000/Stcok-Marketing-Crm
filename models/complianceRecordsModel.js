const mongoose = require('mongoose');

const complianceRecordsSchema = new mongoose.Schema({
    compliance_type: {
        type: String,
        required: true
    },
    reference_type: {
        type: String,
        enum: ['customer', 'lead', 'call_history', 'payment'],
        required: true
    },
    reference_id: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true
    },
    notes: {
        type: String,
        default: null
    },
    recording_url: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['pending', 'in_progress', 'resolved'],
        default: 'pending',
        required: true
    },
    result: {
        type: String,
        default: null
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId, 
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
    deleted_at: {
        type: Date,
        default: null
    }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const ComplianceRecords = mongoose.model('ComplianceRecords', complianceRecordsSchema);
module.exports = ComplianceRecords;
