const express = require('express');
const {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
} = require('../controllers/paymentsController');

const router = express.Router();

router.post('/payments', createPayment);
router.get('/payments', getAllPayments);
router.get('/payments/:id', getPaymentById);
router.put('/payments/:id', updatePayment);
router.delete('/payments/:id', deletePayment);

module.exports = router;
