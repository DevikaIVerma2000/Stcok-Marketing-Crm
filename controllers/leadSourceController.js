const LeadSource = require('../models/leadSourcesModel');

// Create a new lead source
const createLeadSource = async (req, res) => {
  try {
    const newLeadSource = new LeadSource(req.body);
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
    const leadSources = await LeadSource.find();
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
    const leadSource = await LeadSource.findById(id);

    if (!leadSource) {
      return res.status(404).json({
        success: false,
        message: 'Lead source not found',
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
    const updatedLeadSource = await LeadSource.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedLeadSource) {
      return res.status(404).json({
        success: false,
        message: 'Lead source not found',
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

// Delete a lead source by ID
const deleteLeadSource = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLeadSource = await LeadSource.findByIdAndDelete(id);

    if (!deletedLeadSource) {
      return res.status(404).json({
        success: false,
        message: 'Lead source not found',
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
