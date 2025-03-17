const Role = require('../models/rolesModel');

// Create a new role
const createRole = async (req, res) => {
  try {
    const { role_name } = req.body;

    if (!role_name) {
      return res.status(400).json({ success: false, message: "role_name is required" });
    }

    const existingRole = await Role.findOne({ role_name });
    if (existingRole) {
      return res.status(400).json({ success: false, message: "Role already exists" });
    }

    const newRole = new Role(req.body);
    await newRole.save();

    res.status(201).json({
      success: true,
      message: "Role created successfully",
      data: newRole,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Duplicate role_name detected",
        error: error.message,
      });
    }
    res.status(500).json({
      success: false,
      message: "Error creating role",
      error: error.message,
    });
  }
};

// Get all roles
const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find({ deleted_at: null });
    res.status(200).json({
      success: true,
      message: 'Roles retrieved successfully',
      data: roles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching roles',
      error: error.message,
    });
  }
};

// Get a role by ID
const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findOne({ _id: id, deleted_at: null });
    if (!role) {
      return res.status(404).json({ success: false, message: 'Role not found or deleted' });
    }
    res.status(200).json({ success: true, message: 'Role retrieved successfully', data: role });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching role', error: error.message });
  }
};

// Update a role by ID
const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRole = await Role.findOneAndUpdate(
      { _id: id, deleted_at: null },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedRole) {
      return res.status(404).json({ success: false, message: 'Role not found or deleted' });
    }
    res.status(200).json({ success: true, message: 'Role updated successfully', data: updatedRole });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating role', error: error.message });
  }
};

// Soft delete a role
const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRole = await Role.findOneAndUpdate(
      { _id: id, deleted_at: null },
      { deleted_at: new Date() },
      { new: true }
    );
    if (!deletedRole) {
      return res.status(404).json({ success: false, message: 'Role not found or already deleted' });
    }
    res.status(200).json({ success: true, message: 'Role deleted successfully', data: deletedRole });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting role', error: error.message });
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
};
