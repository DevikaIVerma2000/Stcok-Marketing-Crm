const Department = require('../models/departmentsModel');

// Create a department
const createDepartment = async (req, res) => {
  try {
    const newDepartment = new Department({ ...req.body });
    const savedDepartment = await newDepartment.save();
    res.status(201).json(savedDepartment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all departments
const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a department by ID
const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
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
      req.body,
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

// Delete a department by ID
const deleteDepartment = async (req, res) => {
  try {
    const deletedDepartment = await Department.findByIdAndDelete(req.params.id);
    if (!deletedDepartment) {
      return res.status(404).json({ message: 'Department not found' });
    }
    res.status(200).json({ message: 'Department deleted successfully' });
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
