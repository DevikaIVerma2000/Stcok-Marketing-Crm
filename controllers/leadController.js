const Lead = require('../models/leadsModel');

// Function to create a new lead
const createLead = async (req, res) => {
  try {
    const {
      full_name, primary_contact, secondary_contact, email_id, date_of_birth, address,
      city, state, zipcode, country, language, segment, trading_budget, user_id, source_id,
      agency_id, created_by, priority, called_count, call_status_code, dnc, notes,
      dup_count, dup_status, follow_up_date, reassign_datetime, reset_datetime, notify_email,
      updated_by, branch_id
    } = req.body;

    const newLead = new Lead({
      full_name, primary_contact, secondary_contact, email_id, date_of_birth, address,
      city, state, zipcode, country, language, segment, trading_budget, user_id, source_id,
      agency_id, created_by, priority, called_count, call_status_code, dnc, notes,
      dup_count, dup_status, follow_up_date, reassign_datetime, reset_datetime, notify_email,
      updated_by, branch_id
    });

    await newLead.save();
    res.status(201).json({ message: 'Lead created successfully', lead: newLead });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating lead', error });
  }
};

// Function to get all leads
const getAllLeads = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.status(200).json(leads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching leads', error });
  }
};

// Function to get a lead by ID
const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.status(200).json(lead);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching lead', error });
  }
};

// Function to update a lead by ID
const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.status(200).json({ message: 'Lead updated successfully', lead });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating lead', error });
  }
};

// Function to delete a lead by ID
const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.status(200).json({ message: 'Lead deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting lead', error });
  }
};

module.exports = {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead
};
