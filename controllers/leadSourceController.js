const LeadSource = require('../models/leadSourcesModel');

// Create a new lead source
const createLeadSource = async (req, res) => {
  try {
    const { source_name, branch_id, source_description, created_by } = req.body;

    // Directly create a new lead source without duplicate check
    const newLeadSource = new LeadSource({
      source_name,
      branch_id,
      source_description,
      created_by
    });

    await newLeadSource.save();

    res.status(201).json({
      success: true,
      message: 'Lead source created successfully',
      data: newLeadSource,
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
    const leadSources = await LeadSource.find({ deleted_at: null });
    res.status(200).json({
      success: true,
      message: 'Lead sources retrieved successfully',
      data: leadSources,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching lead sources',
      error: error.message,
    });
  }
};

// Get a lead source by ID
const getLeadSourceById = async (req, res) => {
  try {
    const { id } = req.params;
    const leadSource = await LeadSource.findOne({ _id: id, deleted_at: null });
    if (!leadSource) {
      return res.status(404).json({
        success: false,
        message: 'Lead source not found or deleted',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Lead source retrieved successfully',
      data: leadSource,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching lead source',
      error: error.message,
    });
  }
};

// Update a lead source by ID
const updateLeadSource = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedLeadSource = await LeadSource.findOneAndUpdate(
      { _id: id, deleted_at: null },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedLeadSource) {
      return res.status(404).json({
        success: false,
        message: 'Lead source not found or deleted',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Lead source updated successfully',
      data: updatedLeadSource,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating lead source',
      error: error.message,
    });
  }
};

// Soft delete a lead source 
const deleteLeadSource = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLeadSource = await LeadSource.findOneAndUpdate(
      { _id: id, deleted_at: null },
      { deleted_at: new Date() },
      { new: true }
    );
    if (!deletedLeadSource) {
      return res.status(404).json({
        success: false,
        message: 'Lead source not found or already deleted',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Lead source deleted successfully',
      data: deletedLeadSource,
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
