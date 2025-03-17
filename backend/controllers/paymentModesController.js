const PaymentMode = require('../models/paymentModesModel');

// Create a new payment mode
const createPaymentMode = async (req, res) => {
  try {
    const { payment_mode_name, fees_type, fees, notes, created_by, branch_id } = req.body;

    if (!payment_mode_name || !branch_id) {
      return res.status(400).json({
        success: false,
        message: 'Payment mode name and branch ID are required',
      });
    }

    const newPaymentMode = new PaymentMode({
      payment_mode_name: payment_mode_name.trim(),
      fees_type: fees_type || null,
      fees: fees || null,
      notes: notes ? notes.trim() : null,
      created_by: created_by || null,
      branch_id,
    });

    await newPaymentMode.save();

    res.status(201).json({
      success: true,
      message: 'Payment mode created successfully',
      data: newPaymentMode,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating payment mode',
      error: error.message,
    });
  }
};

// Get all payment modes 
const getAllPaymentModes = async (req, res) => {
  try {
    const paymentModes = await PaymentMode.find({});

    res.status(200).json({
      success: true,
      message: 'Payment modes retrieved successfully',
      data: paymentModes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching payment modes',
      error: error.message,
    });
  }
};

// Get payment mode by ID
const getPaymentModeById = async (req, res) => {
  try {
    const { id } = req.params;
    const paymentMode = await PaymentMode.findOne({ _id: id });

    if (!paymentMode) {
      return res.status(404).json({
        success: false,
        message: 'Payment mode not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Payment mode retrieved successfully',
      data: paymentMode,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching payment mode',
      error: error.message,
    });
  }
};

// Update payment mode by ID
const updatePaymentMode = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPaymentMode = await PaymentMode.findOneAndUpdate(
      { _id: id, is_deleted: false },
      { ...req.body, updated_by: req.body.updated_by || null },
      { new: true, runValidators: true }
    );

    if (!updatedPaymentMode) {
      return res.status(404).json({
        success: false,
        message: 'Payment mode not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Payment mode updated successfully',
      data: updatedPaymentMode,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating payment mode',
      error: error.message,
    });
  }
};

// Soft delete payment mode by ID
const deletePaymentMode = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPaymentMode = await PaymentMode.findOneAndUpdate(
      { _id: id, is_deleted: false },
      { is_deleted: true },
      { new: true }
    );

    if (!deletedPaymentMode) {
      return res.status(404).json({
        success: false,
        message: 'Payment mode not found or already deleted',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Payment mode deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting payment mode',
      error: error.message,
    });
  }
};

module.exports = {
  createPaymentMode,
  getAllPaymentModes,
  getPaymentModeById,
  updatePaymentMode,
  deletePaymentMode,
};
