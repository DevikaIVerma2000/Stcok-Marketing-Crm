const Designation = require('../models/designationsModel');

// Create a designation
const createDesignation = async (req, res) => {
  try {
    const newDesignation = new Designation({ ...req.body });
    const savedDesignation = await newDesignation.save();
    res.status(201).json(savedDesignation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all designations
const getAllDesignations = async (req, res) => {
  try {
    const designations = await Designation.find()
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
    const designation = await Designation.findById(req.params.id);
    if (!designation) {
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
    const updatedDesignation = await Designation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDesignation) {
      return res.status(404).json({ message: 'Designation not found' });
    }
    res.status(200).json(updatedDesignation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a designation by ID
const deleteDesignation = async (req, res) => {
  try {
    const deletedDesignation = await Designation.findByIdAndDelete(req.params.id);
    if (!deletedDesignation) {
      return res.status(404).json({ message: 'Designation not found' });
    }
    res.status(200).json({ message: 'Designation deleted successfully' });
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
