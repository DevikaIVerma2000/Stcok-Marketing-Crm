const PaymentMode = require('../models/paymentModesModel');

// Create a new payment mode
const createPaymentMode = async (req, res) => {
  try {
    const newPaymentMode = new PaymentMode(req.body);
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
    const paymentModes = await PaymentMode.find();
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
    const paymentMode = await PaymentMode.findById(id);

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
    const updatedPaymentMode = await PaymentMode.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

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

// Delete payment mode by ID
const deletePaymentMode = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPaymentMode = await PaymentMode.findByIdAndDelete(id);

    if (!deletedPaymentMode) {
      return res.status(404).json({
        success: false,
        message: 'Payment mode not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Payment mode deleted successfully',
      data: deletedPaymentMode,
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
