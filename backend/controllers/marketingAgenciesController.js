const MarketingAgency = require('../models/marketingAgenciesModel');

const createMarketingAgency = async (req, res) => {
  try {
    const { agency_name, branch_id, created_by, agency_description } = req.body;

    // Validation check for required fields
    if (!agency_name || !branch_id || !created_by) {
      return res.status(400).json({
        success: false,
        message: "agency_name, branch_id, and created_by are required fields",
      });
    }

    const newAgency = new MarketingAgency({
      agency_name,
      branch_id,
      created_by,
      agency_description,
    });

    await newAgency.save();

    res.status(201).json({
      success: true,
      message: "Marketing agency created successfully",
      data: newAgency,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating marketing agency",
      error: error.message,
    });
  }
};

// Get all marketing agencies 
const getAllMarketingAgencies = async (req, res) => {
  try {
    const agencies = await MarketingAgency.find({ deleted_at: null });
    res.status(200).json({
      success: true,
      message: "Marketing agencies retrieved successfully",
      data: agencies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching marketing agencies",
      error: error.message,
    });
  }
};

// Get marketing agency by ID 
const getMarketingAgencyById = async (req, res) => {
  try {
    const { id } = req.params;
    const agency = await MarketingAgency.findOne({ _id: id, deleted_at: null });

    if (!agency) {
      return res.status(404).json({
        success: false,
        message: "Marketing agency not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Marketing agency retrieved successfully",
      data: agency,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching marketing agency",
      error: error.message,
    });
  }
};

// Update marketing agency by ID
const updateMarketingAgency = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedAgency = await MarketingAgency.findOneAndUpdate(
      { _id: id, deleted_at: null },
      { ...req.body, updated_at: Date.now() }, 
      { new: true, runValidators: true }
    );

    if (!updatedAgency) {
      return res.status(404).json({
        success: false,
        message: "Marketing agency not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Marketing agency updated successfully",
      data: updatedAgency,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating marketing agency",
      error: error.message,
    });
  }
};

// Soft delete marketing agency by ID
const deleteMarketingAgency = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAgency = await MarketingAgency.findOneAndUpdate(
      { _id: id, deleted_at: null },
      { deleted_at: Date.now() }, 
      { new: true }
    );

    if (!deletedAgency) {
      return res.status(404).json({
        success: false,
        message: "Marketing agency not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Marketing agency deleted successfully",
      data: deletedAgency,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting marketing agency",
      error: error.message,
    });
  }
};

module.exports = {
  createMarketingAgency,
  getAllMarketingAgencies,
  getMarketingAgencyById,
  updateMarketingAgency,
  deleteMarketingAgency,
};
