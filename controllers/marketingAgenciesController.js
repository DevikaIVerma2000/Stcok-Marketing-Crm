const MarketingAgency = require('../models/marketingAgenciesModel'); 

const createMarketingAgency = async (req, res) => {
  try {
    const newAgency = new MarketingAgency(req.body);
    await newAgency.save();
    res.status(201).json({
      success: true,
      message: 'Marketing agency created successfully',
      data: newAgency,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating marketing agency',
      error: error.message,
    });
  }
};

// Get all marketing agencies
const getAllMarketingAgencies = async (req, res) => {
  try {
    const agencies = await MarketingAgency.find();
    res.status(200).json({
      success: true,
      message: 'Marketing agencies retrieved successfully',
      data: agencies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching marketing agencies',
      error: error.message,
    });
  }
};

// Get marketing agency by ID
const getMarketingAgencyById = async (req, res) => {
  try {
    const { id } = req.params;
    const agency = await MarketingAgency.findById(id);

    if (!agency) {
      return res.status(404).json({
        success: false,
        message: 'Marketing agency not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Marketing agency retrieved successfully',
      data: agency,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching marketing agency',
      error: error.message,
    });
  }
};

// Update marketing agency by ID
const updateMarketingAgency = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAgency = await MarketingAgency.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedAgency) {
      return res.status(404).json({
        success: false,
        message: 'Marketing agency not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Marketing agency updated successfully',
      data: updatedAgency,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating marketing agency',
      error: error.message,
    });
  }
};

// Delete marketing agency by ID
const deleteMarketingAgency = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAgency = await MarketingAgency.findByIdAndDelete(id);

    if (!deletedAgency) {
      return res.status(404).json({
        success: false,
        message: 'Marketing agency not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Marketing agency deleted successfully',
      data: deletedAgency,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting marketing agency',
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
