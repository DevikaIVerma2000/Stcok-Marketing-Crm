const mongoose = require('mongoose');
const Designation = require('../models/designationsModel');

const createDesignation = async (req, res) => {
  try {
    const { designation_name, department_id, branch_id, created_by } = req.body;

    if (!designation_name || !department_id || !branch_id || !created_by) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingDesignation = await Designation.findOne({
      designation_name,
      department_id,
      branch_id,
      deleted_at: null
    });

    if (existingDesignation) {
      return res.status(409).json({ message: 'Designation already exists in this department and branch' });
    }

    const newDesignation = new Designation({ designation_name, department_id, branch_id, created_by });
    const savedDesignation = await newDesignation.save();

    res.status(201).json(savedDesignation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get all designations (excluding soft deleted)
const getAllDesignations = async (req, res) => {
  try {
    const designations = await Designation.find({ deleted_at: null })
      .populate('department_id', 'department_name')
      .populate('branch_id', 'branch_name')
      .populate('created_by', 'username');

    res.status(200).json(designations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a designation by ID
const getDesignationById = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const designation = await Designation.findById(req.params.id)
      .populate('department_id', 'department_name')
      .populate('branch_id', 'branch_name')
      .populate('created_by', 'username');

    if (!designation || designation.deleted_at) {
      return res.status(404).json({ message: 'Designation not found' });
    }

    res.status(200).json(designation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a designation by ID
const updateDesignation = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const { designation_name, department_id, branch_id } = req.body;

    if (!designation_name && !department_id && !branch_id) {
      return res.status(400).json({ message: 'At least one field is required to update' });
    }

    const updatedDesignation = await Designation.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updated_at: Date.now() },
      { new: true }
    )
      .populate('department_id', 'department_name')
      .populate('branch_id', 'branch_name')
      .populate('created_by', 'username');

    if (!updatedDesignation || updatedDesignation.deleted_at) {
      return res.status(404).json({ message: 'Designation not found' });
    }

    res.status(200).json(updatedDesignation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Soft delete a designation by ID
const deleteDesignation = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const designation = await Designation.findById(req.params.id);
    if (!designation || designation.deleted_at) {
      return res.status(404).json({ message: 'Designation not found' });
    }

    designation.deleted_at = Date.now();
    await designation.save();

    res.status(200).json({ message: 'Designation soft deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createDesignation,
  getAllDesignations,
  getDesignationById,
  updateDesignation,
  deleteDesignation,
};
