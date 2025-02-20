const mongoose = require('mongoose');
const Department = require('../models/departmentsModel');


const createDepartment = async (req, res) => {
  try {
    const { department_name, created_by, branch_id } = req.body;

    if (!department_name || !created_by || !branch_id) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingDepartment = await Department.findOne({ department_name, branch_id, deleted_at: null });
    if (existingDepartment) {
      return res.status(409).json({ message: 'Department with this name already exists in this branch' });
    }

    const newDepartment = new Department({
      department_name,
      created_by,
      branch_id,
    });

    const savedDepartment = await newDepartment.save();
    res.status(201).json(savedDepartment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get all departments (excluding soft-deleted ones)
const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find({ deleted_at: null }).populate('created_by branch_id');
    res.status(200).json(departments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a department by ID
const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findOne({ _id: req.params.id, deleted_at: null }).populate('created_by branch_id');
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.status(200).json(department);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a department by ID
const updateDepartment = async (req, res) => {
  try {
    const updatedDepartment = await Department.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updated_at: Date.now() },
      { new: true }
    );
    if (!updatedDepartment) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.status(200).json(updatedDepartment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Soft delete a department by ID
const deleteDepartment = async (req, res) => {
  try {
    const deletedDepartment = await Department.findByIdAndUpdate(
      req.params.id,
      { deleted_at: Date.now() },
      { new: true }
    );
    if (!deletedDepartment) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.status(200).json({ message: 'Department soft deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};
