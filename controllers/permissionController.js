
const Permission = require('../models/permission');


const createPermission = async (req, res) => {
    try {
        const { permissionId, permissionName } = req.body;

       
        const existingPermission = await Permission.findOne({ permissionId });
        if (existingPermission) {
            return res.status(400).json({ message: 'Permission ID already exists' });
        }

        const newPermission = new Permission({ permissionId, permissionName });
        await newPermission.save();
        res.status(201).json({ message: 'Permission created successfully', newPermission });
    } catch (error) {
        res.status(500).json({ message: 'Error creating permission', error });
    }
};


const getAllPermissions = async (req, res) => {
    try {
        const permissions = await Permission.find();
        res.status(200).json(permissions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching permissions', error });
    }
};


const getPermissionById = async (req, res) => {
    try {
        const permission = await Permission.findOne({ permissionId: req.params.permissionId });

        if (!permission) {
            return res.status(404).json({ message: 'Permission not found' });
        }

        res.status(200).json(permission);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching permission by ID', error });
    }
};

const updatePermission = async (req, res) => {
    try {
        const { permissionId } = req.params;
        const { permissionName } = req.body;

        const updatedPermission = await Permission.findOneAndUpdate(
            { permissionId },
            { permissionName },
            { new: true } 
        );

        if (!updatedPermission) {
            return res.status(404).json({ message: 'Permission not found' });
        }

        res.status(200).json({ message: 'Permission updated successfully', updatedPermission });
    } catch (error) {
        res.status(500).json({ message: 'Error updating permission', error });
    }
};


const deletePermission = async (req, res) => {
    try {
        const { permissionId } = req.params;

        const deletedPermission = await Permission.findOneAndDelete({ permissionId });

        if (!deletedPermission) {
            return res.status(404).json({ message: 'Permission not found' });
        }

        res.status(200).json({ message: 'Permission deleted successfully', deletedPermission });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting permission', error });
    }
};

module.exports = {
    createPermission,
    getAllPermissions,
    getPermissionById,
    updatePermission,
    deletePermission,
};
