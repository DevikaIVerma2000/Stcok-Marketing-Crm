const mongoose = require('mongoose');
const CallStatus = require('../models/callStatusesModel');

const createCallStatus = async (req, res) => {
  try {
    const { call_status_code, call_status_name, created_by, branch_id } = req.body;

    if (!call_status_code || !call_status_name || !created_by || !branch_id) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingCallStatus = await CallStatus.findOne({ call_status_code, branch_id, deleted_at: null });
    if (existingCallStatus) {
      return res.status(409).json({ message: 'Call status with this code already exists in this branch' });
    }

    const newCallStatus = new CallStatus({
      call_status_code,
      call_status_name,
      created_by,
      branch_id,
    });

    const savedCallStatus = await newCallStatus.save();
    res.status(201).json(savedCallStatus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllCallStatuses = async (req, res) => {
  try {
    const callStatuses = await CallStatus.find({ deleted_at: null }).populate('created_by branch_id');
    res.status(200).json(callStatuses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCallStatusById = async (req, res) => {
  try {
    const callStatus = await CallStatus.findOne({ _id: req.params.id, deleted_at: null }).populate('created_by branch_id');
    if (!callStatus) {
      return res.status(404).json({ message: 'Call status not found' });
    }
    res.status(200).json(callStatus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateCallStatus = async (req, res) => {
  try {
    const updatedCallStatus = await CallStatus.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updated_at: Date.now() },
      { new: true }
    );
    if (!updatedCallStatus) {
      return res.status(404).json({ message: 'Call status not found' });
    }
    res.status(200).json(updatedCallStatus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteCallStatus = async (req, res) => {
  try {
    const deletedCallStatus = await CallStatus.findByIdAndUpdate(
      req.params.id,
      { deleted_at: Date.now() },
      { new: true }
    );
    if (!deletedCallStatus) {
      return res.status(404).json({ message: 'Call status not found' });
    }
    res.status(200).json({ message: 'Call status soft deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createCallStatus,
  getAllCallStatuses,
  getCallStatusById,
  updateCallStatus,
  deleteCallStatus,
};
