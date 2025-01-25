const RolePermission = require('../models/rolePermissionModel');
const Permission = require('../models/permission');
const Role = require('../models/roleModel');
// POST: Create a new role-permission mapping
const createRolePermission = async (req, res) => {
    try {
        const { roleId, permissionId } = req.body;

        // Validate roleId and permissionId
        const role = await Role.findOne({ roleId });
        const permission = await Permission.findOne({ permissionId });

        if (!role || !permission) {
            return res.status(404).json({ message: 'Role or Permission not found' });
        }

        // Check if the mapping already exists
        const existingMapping = await RolePermission.findOne({ roleId, permissionId });
        if (existingMapping) {
            return res.status(400).json({
                message: 'This Role-Permission mapping already exists',
            });
        }

        // Create the new mapping
        const mapping = new RolePermission({ roleId, permissionId });
        await mapping.save();

        res.status(201).json({
            message: 'Role-Permission mapping created successfully',
            data: mapping,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating mapping', error: error.message });
    }
};

// GET: Fetch all mappings
const getAllRolePermissions = async (req, res) => {
    try {
        const mappings = await RolePermission.find().populate('roleId permissionId');
        res.status(200).json({ message: 'Mappings fetched successfully', data: mappings });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching mappings', error: error.message });
    }
};

// GET by ID: Fetch a specific mapping
const getRolePermissionById = async (req, res) => {
    try {
        const { id } = req.params;

        const mapping = await RolePermission.findById(id).populate('roleId permissionId');
        if (!mapping) {
            return res.status(404).json({ message: 'Mapping not found' });
        }

        res.status(200).json({ message: 'Mapping fetched successfully', data: mapping });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching mapping', error: error.message });
    }
};

// PUT: Update a specific mapping
const updateRolePermission = async (req, res) => {
    try {
        const { id } = req.params;
        const { roleId, permissionId } = req.body;

        const updatedMapping = await RolePermission.findByIdAndUpdate(
            id,
            { roleId, permissionId },
            { new: true }
        );

        if (!updatedMapping) {
            return res.status(404).json({ message: 'Mapping not found' });
        }

        res.status(200).json({ message: 'Mapping updated successfully', data: updatedMapping });
    } catch (error) {
        res.status(500).json({ message: 'Error updating mapping', error: error.message });
    }
};

// DELETE: Delete a specific mapping
const deleteRolePermission = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedMapping = await RolePermission.findByIdAndDelete(id);
        if (!deletedMapping) {
            return res.status(404).json({ message: 'Mapping not found' });
        }

        res.status(200).json({ message: 'Mapping deleted successfully', data: deletedMapping });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting mapping', error: error.message });
    }
};

module.exports = {
    createRolePermission,
    getAllRolePermissions,
    getRolePermissionById,
    updateRolePermission,
    deleteRolePermission,
};
