const AccessRequest = require('../models/AccessRequestModel');

// Create a new Access Request
const createAccessRequest = async (req, res) => {
    try {
        const { user_id, request_type, target_id, status, approved_by, approval_date, notes } = req.body;
        
        const newAccessRequest = new AccessRequest({
            user_id,
            request_type,
            target_id,
            status, 
            approved_by,
            approval_date,
            notes,
        });
        
        await newAccessRequest.save();
        return res.status(201).json({ success: true, data: newAccessRequest });
    } catch (error) {
        console.error('Error creating access request:', error);
        return res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Retrieve all Access Requests
const getAllAccessRequests = async (req, res) => {
    try {
        const accessRequests = await AccessRequest.find();
        return res.status(200).json({ success: true, data: accessRequests });
    } catch (error) {
        console.error('Error fetching access requests:', error);
        return res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Retrieve a specific Access Request by ID
const getAccessRequestById = async (req, res) => {
    try {
        const accessRequest = await AccessRequest.findById(req.params.id);
        if (!accessRequest) {
            return res.status(404).json({ success: false, error: 'Access Request not found' });
        }
        return res.status(200).json({ success: true, data: accessRequest });
    } catch (error) {
        console.error('Error fetching access request:', error);
        return res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Update an Access Request
const updateAccessRequest = async (req, res) => {
    try {
        const { user_id, request_type, target_id, status, approved_by, approval_date, notes } = req.body;
        const accessRequest = await AccessRequest.findById(req.params.id);
        if (!accessRequest) {
            return res.status(404).json({ success: false, error: 'Access Request not found' });
        }
        // Update only provided fields
        if (user_id !== undefined) accessRequest.user_id = user_id;
        if (request_type !== undefined) accessRequest.request_type = request_type;
        if (target_id !== undefined) accessRequest.target_id = target_id;
        if (status !== undefined) accessRequest.status = status;
        if (approved_by !== undefined) accessRequest.approved_by = approved_by;
        if (approval_date !== undefined) accessRequest.approval_date = approval_date;
        if (notes !== undefined) accessRequest.notes = notes;
        
        await accessRequest.save();
        return res.status(200).json({ success: true, data: accessRequest });
    } catch (error) {
        console.error('Error updating access request:', error);
        return res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// Delete an Access Request
const deleteAccessRequest = async (req, res) => {
    try {
        const accessRequest = await AccessRequest.findByIdAndDelete(req.params.id);
        if (!accessRequest) {
            return res.status(404).json({ success: false, error: 'Access Request not found' });
        }
        return res.status(200).json({ success: true, message: 'Access Request deleted successfully' });
    } catch (error) {
        console.error('Error deleting access request:', error);
        return res.status(500).json({ success: false, error: 'Server Error' });
    }
};

module.exports = {
    createAccessRequest,
    getAllAccessRequests,
    getAccessRequestById,
    updateAccessRequest,
    deleteAccessRequest,
};
