const mongoose = require('mongoose');
const Role = require('../models/rolesModel');

// Create a new role
const createRole = async (req, res) => {
  try {
    const { id, role_name } = req.body;

    if (!id || !role_name) {
      return res.status(400).json({
        success: false,
        message: 'Both id and role_name are required',
      });
    }

    const existingRole = await Role.findOne({ id });
    if (existingRole) {
      return res.status(409).json({
        success: false,
        message: 'Role with this ID already exists',
      });
    }

    const newRole = new Role({ id, role_name });
    await newRole.save();
    
    res.status(201).json({
      success: true,
      message: 'Role created successfully',
      data: newRole,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating role',
      error: error.message,
    });
  }
};

// Get all roles
const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
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

// Get role by ID
const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;

    const role = await Role.findOne({ id });
    if (!role) {
      return res.status(404).json({
        success: false,
        message: 'Role not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Role retrieved successfully',
      data: role,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching role',
      error: error.message,
    });
  }
};

// Update role by ID
const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRole = await Role.findOneAndUpdate({ id }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedRole) {
      return res.status(404).json({
        success: false,
        message: 'Role not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Role updated successfully',
      data: updatedRole,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating role',
      error: error.message,
    });
  }
};

// Delete role by ID
const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRole = await Role.findOneAndDelete({ id });
    if (!deletedRole) {
      return res.status(404).json({
        success: false,
        message: 'Role not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Role deleted successfully',
      data: deletedRole,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting role',
      error: error.message,
    });
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
};
