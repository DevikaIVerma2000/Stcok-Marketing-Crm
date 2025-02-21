const Lead = require('../models/leadsModel');

// Create a new lead
const createLead = async (req, res) => {
  try {
    const requiredFields = ['full_name', 'primary_contact', 'source_id', 'agency_id', 'created_by', 'branch_id'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    const newLead = new Lead(req.body);
    await newLead.save();
    res.status(201).json({ message: 'Lead created successfully', lead: newLead });
  } catch (error) {
    res.status(500).json({ message: 'Error creating lead', error: error.message });
  }
};

// Get all leads with pagination and optional search
const getAllLeads = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;

    const query = search ? { full_name: { $regex: search, $options: 'i' } } : {};

    const leads = await Lead.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const totalLeads = await Lead.countDocuments(query);

    res.status(200).json({
      total: totalLeads,
      page: parseInt(page),
      limit: parseInt(limit),
      leads
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leads', error: error.message });
  }
};

// Get a single lead by ID
const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching lead', error: error.message });
  }
};

// Update a lead by ID
const updateLead = async (req, res) => {
  try {
    const { created_by, source_id, agency_id, branch_id, ...updateData } = req.body;

    const lead = await Lead.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.status(200).json({ message: 'Lead updated successfully', lead });
  } catch (error) {
    res.status(500).json({ message: 'Error updating lead', error: error.message });
  }
};

// Soft delete a lead
const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true });
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.status(200).json({ message: 'Lead marked as deleted', lead });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting lead', error: error.message });
  }
};

module.exports = {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead
};
