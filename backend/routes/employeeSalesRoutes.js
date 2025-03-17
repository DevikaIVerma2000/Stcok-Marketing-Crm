const express = require('express');
const {  getAllEmployeeSales, getEmployeeSaleById, createEmployeeSale, updateEmployeeSale, deleteEmployeeSale } = require('../controllers/employeeSalesController');
const router = express.Router();

router.get('/', getAllEmployeeSales);
router.get('/:id', getEmployeeSaleById);
router.post('/', createEmployeeSale);
router.put('/:id', updateEmployeeSale);
router.delete('/:id', deleteEmployeeSale);

module.exports = router;
