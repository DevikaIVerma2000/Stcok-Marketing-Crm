const ComplianceRecord = require('../models/complianceRecordsModel');

// Create a new compliance record
const createComplianceRecord = async (req, res) => {
  try {
    const newRecord = new ComplianceRecord(req.body);
    await newRecord.save();
    res.status(201).json({
      success: true,
      message: 'Compliance record created successfully',
      data: newRecord,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating compliance record',
      error: error.message,
    });
  }
};

// Get all compliance records
const getAllComplianceRecords = async (req, res) => {
  try {
    const records = await ComplianceRecord.find()
      .populate('reference_id', 'name')
      .populate('created_by', 'username');
    res.status(200).json({
      success: true,
      message: 'Compliance records retrieved successfully',
      data: records,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching compliance records',
      error: error.message,
    });
  }
};

// Get compliance record by ID
const getComplianceRecordById = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await ComplianceRecord.findById(id)
      .populate('reference_id', 'name')
      .populate('created_by', 'username');
    
    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Compliance record not found',
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Compliance record retrieved successfully',
      data: record,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching compliance record',
      error: error.message,
    });
  }
};

// Update compliance record by ID
const updateComplianceRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedRecord = await ComplianceRecord.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    
    if (!updatedRecord) {
      return res.status(404).json({
        success: false,
        message: 'Compliance record not found',
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Compliance record updated successfully',
      data: updatedRecord,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating compliance record',
      error: error.message,
    });
  }
};

// Delete compliance record by ID
const deleteComplianceRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecord = await ComplianceRecord.findByIdAndDelete(id);
    
    if (!deletedRecord) {
      return res.status(404).json({
        success: false,
        message: 'Compliance record not found',
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Compliance record deleted successfully',
      data: deletedRecord,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting compliance record',
      error: error.message,
    });
  }
};

module.exports = {
  createComplianceRecord,
  getAllComplianceRecords,
  getComplianceRecordById,
  updateComplianceRecord,
  deleteComplianceRecord,
};
