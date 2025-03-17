const Branch = require('../models/branchesModel');

// Create a new branch
const createBranch = async (req, res) => {
  try {
    const branch = new Branch(req.body);
    await branch.save();
    res.status(201).json({
      success: true,
      message: 'Branch created successfully',
      data: branch,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating branch',
      error: error.message,
    });
  }
};

// Get all branches
const getAllBranches = async (req, res) => {
  try {
    const branches = await Branch.find();
    res.status(200).json({
      success: true,
      message: 'Branches retrieved successfully',
      data: branches,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching branches',
      error: error.message,
    });
  }
};

// Get a branch by ID
const getBranchById = async (req, res) => {
  try {
    const { id } = req.params;
    const branch = await Branch.findById(id);
    if (!branch) {
      return res.status(404).json({
        success: false,
        message: 'Branch not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Branch retrieved successfully',
      data: branch,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching branch',
      error: error.message,
    });
  }
};

// Update a branch by ID
const updateBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBranch = await Branch.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedBranch) {
      return res.status(404).json({
        success: false,
        message: 'Branch not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Branch updated successfully',
      data: updatedBranch,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating branch',
      error: error.message,
    });
  }
};

// Delete a branch by ID
const deleteBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBranch = await Branch.findByIdAndDelete(id);
    if (!deletedBranch) {
      return res.status(404).json({
        success: false,
        message: 'Branch not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Branch deleted successfully',
      data: deletedBranch,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting branch',
      error: error.message,
    });
  }
};

module.exports = {
  createBranch,
  getAllBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
};
