const express = require('express');
const {
  createPaymentMode,
  getAllPaymentModes,
  getPaymentModeById,
  updatePaymentMode,
  deletePaymentMode,
} = require('../controllers/paymentModesController');

const router = express.Router();

router.post('/payment-modes', createPaymentMode);
router.get('/payment-modes', getAllPaymentModes);
router.get('/payment-modes/:id', getPaymentModeById);
router.put('/payment-modes/:id', updatePaymentMode);
router.delete('/payment-modes/:id', deletePaymentMode);

module.exports = router;
