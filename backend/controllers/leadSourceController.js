const LeadSource = require('../models/leadSourcesModel');
const User = require('../models/userModel');
const UserAuth = require('../models/userAuthModel');
const Branch = require('../models/branchesModel');

// Create a new lead source
const createLeadSource = async (req, res) => {
    try {
        const { source_name, source_description } = req.body;
        const user = req.user;

        if (!source_name || source_name.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Source name is required',
            });
        }
        if (source_name.length > 30) {
            return res.status(400).json({
                success: false,
                message: 'Source name must be 30 characters or less',
            });
        }
        if (source_description?.length > 60) {
            return res.status(400).json({
                success: false,
                message: 'Description must be 60 characters or less',
            });
        }
        if (!user?.id || !user?.branch_id) {
            return res.status(400).json({
                success: false,
                message: 'User or branch information missing',
            });
        }

        // Check for duplicate
        const existingSource = await LeadSource.findOne({
            source_name: source_name.trim(),
            branch_id: user.branch_id,
            deleted_at: null,
        });
        if (existingSource) {
            return res.status(400).json({
                success: false,
                message: `Lead source "${source_name}" already exists for this branch`,
            });
        }

        // Create lead source
        const leadSource = new LeadSource({
            source_name: source_name.trim(),
            source_description,
            created_by: user.id,
            branch_id: user.branch_id,
        });
        const savedSource = await leadSource.save();

        // Get creator's name
        const userAuth = await UserAuth.findById(user.id);
        if (!userAuth) throw new Error('UserAuth not found');
        const userDoc = await User.findById(userAuth.user_id).select('full_name');
        if (!userDoc) throw new Error('User not found');

        res.status(201).json({
            success: true,
            message: 'Lead source created',
            data: {
                id: savedSource._id,
                source_name: savedSource.source_name,
                source_description: savedSource.source_description || '',
                created: userDoc.full_name || 'Unknown',
                created_on: savedSource.createdAt.toISOString().split('T')[0],
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating lead source',
            error: error.message,
        });
    }
};

// Get all lead sources
const getAllLeadSources = async (req, res) => {
    try {
        
        const [leadSources, totalLeadSources] = await Promise.all([
            LeadSource.find({ deleted_at: null })
                .populate({
                    path: 'created_by',
                    model: 'UserAuth',
                    populate: { path: 'user_id', model: 'User', select: 'full_name' },
                })
                .populate('branch_id', 'name'),
            LeadSource.countDocuments({ deleted_at: null }),
        ]);

       
        const formattedSources = leadSources.map(lead => ({
            id: lead._id,
            source_name: lead.source_name,
            source_description: lead.source_description || '',
            created: lead.created_by?.user_id?.full_name || 'Unknown',
            created_on: lead.createdAt.toISOString().split('T')[0],
            actions: {
                edit: `/leadSources/edit/${lead._id}`,
                delete: `/leadSources/delete/${lead._id}`,
            },
        }));

        res.status(200).json({
            success: true,
            message: 'Lead sources retrieved',
            total: totalLeadSources,
            data: formattedSources,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching lead sources',
            error: error.message,
        });
    }
};


const getLeadSourceById = async (req, res) => {
    try {
        const { id } = req.params;
        const leadSource = await LeadSource.findOne({ _id: id, deleted_at: null })
            .populate({
                path: 'created_by',
                model: 'UserAuth',
                populate: { path: 'user_id', model: 'User', select: 'full_name' },
            })
            .populate('branch_id', 'name');

        if (!leadSource) {
            return res.status(404).json({
                success: false,
                message: 'Lead source not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Lead source retrieved',
            data: {
                id: leadSource._id,
                source_name: leadSource.source_name,
                source_description: leadSource.source_description || '',
                created: leadSource.created_by?.user_id?.full_name || 'Unknown',
                created_on: leadSource.createdAt.toISOString().split('T')[0],
                updated_at: leadSource.updatedAt?.toISOString().split('T')[0] || null,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching lead source',
            error: error.message,
        });
    }
};


const updateLeadSource = async (req, res) => {
    try {
        const { id } = req.params;
        const { source_name, source_description } = req.body;

        // Check if at least one field is provided
        if (!source_name && source_description === undefined) {
            return res.status(400).json({
                success: false,
                message: 'At least one field (source_name or source_description) must be provided',
            });
        }

        // Validate input
        if (source_name && source_name.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Source name cannot be empty',
            });
        }
        if (source_name && source_name.length > 30) {
            return res.status(400).json({
                success: false,
                message: 'Source name must be 30 characters or less',
            });
        }
        if (source_description?.length > 60) {
            return res.status(400).json({
                success: false,
                message: 'Description must be 60 characters or less',
            });
        }

        const leadSource = await LeadSource.findOne({ _id: id, deleted_at: null });
        if (!leadSource) {
            return res.status(404).json({
                success: false,
                message: 'Lead source not found',
            });
        }

        // Check for duplicate source name
        if (source_name) {
            const existingSource = await LeadSource.findOne({
                source_name: source_name.trim(),
                branch_id: leadSource.branch_id,
                _id: { $ne: id },
                deleted_at: null,
            });
            if (existingSource) {
                return res.status(400).json({
                    success: false,
                    message: `Lead source "${source_name}" already exists for this branch. Use a unique name or update the existing lead source with ID "${existingSource._id}".`,
                });
            }
        }

        // Prepare update data
        const updateData = {};
        if (source_name) updateData.source_name = source_name.trim();
        if (source_description !== undefined) updateData.source_description = source_description;
        updateData.updatedAt = new Date();

        // Update lead source
        const updatedLeadSource = await LeadSource.findOneAndUpdate(
            { _id: id, deleted_at: null },
            updateData,
            { new: true, runValidators: true }
        )
            .populate({
                path: 'created_by',
                model: 'UserAuth',
                populate: { path: 'user_id', model: 'User', select: 'full_name' },
            })
            .populate('branch_id', 'name');

        if (!updatedLeadSource) {
            return res.status(404).json({
                success: false,
                message: 'Lead source not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Lead source updated',
            data: {
                id: updatedLeadSource._id,
                source_name: updatedLeadSource.source_name,
                source_description: updatedLeadSource.source_description || '',
                created: updatedLeadSource.created_by?.user_id?.full_name || 'Unknown',
                created_on: updatedLeadSource.createdAt.toISOString().split('T')[0],
                branch: updatedLeadSource.branch_id?.name || 'Unknown',
                updated_at: updatedLeadSource.updatedAt.toISOString().split('T')[0],
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating lead source',
            error: error.message,
        });
    }
};

// Delete a lead source 
const deleteLeadSource = async (req, res) => {
    try {
        const { id } = req.params;
        const leadSource = await LeadSource.findOneAndDelete(
            { _id: id, deleted_at: null },
            { deleted_at: new Date() },
            { new: true }
        );

        if (!leadSource) {
            return res.status(404).json({
                success: false,
                message: 'Lead source not found or already deleted',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Lead source deleted',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting lead source',
            error: error.message,
        });
    }
};

module.exports = {
    createLeadSource,
    getAllLeadSources,
    getLeadSourceById,
    updateLeadSource,
    deleteLeadSource,
};