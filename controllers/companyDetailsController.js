const CompanyDetails = require('../models/companyDetailsModel');

// Create company detail
const createCompanyDetail = async (req, res) => {
  try {
    const newCompanyDetail = new CompanyDetails({
      ...req.body,
    });
    const savedCompanyDetail = await newCompanyDetail.save();
    res.status(201).json(savedCompanyDetail);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all company details
const getAllCompanyDetails = async (req, res) => {
  try {
    const companyDetails = await CompanyDetails.find();
    res.status(200).json(companyDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get company detail by ID
const getCompanyDetailById = async (req, res) => {
  try {
    const companyDetail = await CompanyDetails.findById(req.params.id);
    if (!companyDetail) {
      return res.status(404).json({ message: 'Company Detail not found' });
    }
    res.status(200).json(companyDetail);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update company detail by ID
const updateCompanyDetail = async (req, res) => {
  try {
    const updatedCompanyDetail = await CompanyDetails.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCompanyDetail) {
      return res.status(404).json({ message: 'Company Detail not found' });
    }
    res.status(200).json(updatedCompanyDetail);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete company detail by ID
const deleteCompanyDetail = async (req, res) => {
  try {
    const deletedCompanyDetail = await CompanyDetails.findByIdAndDelete(req.params.id);
    if (!deletedCompanyDetail) {
      return res.status(404).json({ message: 'Company Detail not found' });
    }
    res.status(200).json({ message: 'Company Detail deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createCompanyDetail,
  getAllCompanyDetails,
  getCompanyDetailById,
  updateCompanyDetail,
  deleteCompanyDetail,
};
