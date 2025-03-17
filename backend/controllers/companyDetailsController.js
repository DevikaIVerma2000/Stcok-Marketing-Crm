const CompanyDetails = require('../models/companyDetailsModel');

// Create company detail
const createCompanyDetail = async (req, res) => {
  try {
    const { meta_name, meta_data, meta_description, meta_comment, created_by } = req.body;

    const exitingCompany = await CompanyDetails.findOne({meta_name, meta_data,meta_description});
    if(exitingCompany){
      return res.status(400).json({ message: 'Company detail with the same meta_name, meta_data, and meta_description already exists' });
    }

    const newCompanyDetail = new CompanyDetails({
      meta_name,
      meta_data,
      meta_description,
      meta_comment,
      created_by,
      status: 1,
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
    const companyDetails = await CompanyDetails.find({ deleted_at: null }).populate('created_by', 'name email'); 
    res.status(200).json(companyDetails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get company detail by ID
const getCompanyDetailById = async (req, res) => {
  try {
    const companyDetail = await CompanyDetails.findOne({ _id: req.params.id, deleted_at: null }).populate('created_by', 'name email');
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
    const updatedCompanyDetail = await CompanyDetails.findOneAndUpdate(
      { _id: req.params.id, deleted_at: null },
      { ...req.body, updated_at: Date.now() },
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

// Soft delete company detail by ID
const deleteCompanyDetail = async (req, res) => {
  try {
    const deletedCompanyDetail = await CompanyDetails.findOneAndUpdate(
      { _id: req.params.id, deleted_at: null },
      { deleted_at: Date.now(), status: 0 },
      { new: true }
    );

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
