const express = require('express');
const {
  createPaymentMode,
  getAllPaymentModes,
  getPaymentModeById,
  updatePaymentMode,
  deletePaymentMode,
} = require('../controllers/paymentModesController');

const router = express.Router();

router.post('/paymentModes', createPaymentMode);
router.get('/paymentModes', getAllPaymentModes);
router.get('/paymentModes/:id', getPaymentModeById);
router.put('/paymentModes/:id', updatePaymentMode);
router.delete('/paymentModes/:id', deletePaymentMode);

module.exports = router;
