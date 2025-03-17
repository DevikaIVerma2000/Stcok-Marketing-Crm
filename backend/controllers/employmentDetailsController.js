const EmploymentDetails = require('../models/employmentDetailsModel');

const getAllEmploymentDetails = async (req, res) => {
  try {
    const employmentDetails = await EmploymentDetails.find();
    res.status(200).json(employmentDetails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getEmploymentDetailById = async (req, res) => {
  try {
    const employmentDetail = await EmploymentDetails.findById(req.params.id);
    if (!employmentDetail) {
      return res.status(404).json({ message: 'Employment detail not found' });
    }
    res.status(200).json(employmentDetail);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createEmploymentDetail = async (req, res) => {
  try {
    const newEmploymentDetail = new EmploymentDetails(req.body);
    await newEmploymentDetail.save();
    res.status(201).json(newEmploymentDetail);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateEmploymentDetail = async (req, res) => {
  try {
    const updatedEmploymentDetail = await EmploymentDetails.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedEmploymentDetail) {
      return res.status(404).json({ message: 'Employment detail not found' });
    }
    res.status(200).json(updatedEmploymentDetail);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteEmploymentDetail = async (req, res) => {
  try {
    const employmentDetail = await EmploymentDetails.findByIdAndDelete(req.params.id);
    if (!employmentDetail) {
      return res.status(404).json({ message: 'Employment detail not found' });
    }
    res.status(200).json({ message: 'Employment detail deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllEmploymentDetails,                                                         
  getEmploymentDetailById,                                         
  createEmploymentDetail,                                       
  updateEmploymentDetail,                                          
  deleteEmploymentDetail,                                                        
};
