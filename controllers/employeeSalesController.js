const EmployeeSales = require('../models/employeeSalesModel');

async function getAllEmployeeSales(req, res) {
  try {
    const sales = await EmployeeSales.find().populate('payment_id user_id team_id team_leader_id parent_team_leader_id');
    res.status(200).json({ success: true, data: sales });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function getEmployeeSaleById(req, res) {
  try {
    const sale = await EmployeeSales.findById(req.params.id).populate('payment_id user_id team_id team_leader_id parent_team_leader_id');
    if (!sale) return res.status(404).json({ success: false, message: 'Sale not found' });
    res.status(200).json({ success: true, data: sale });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function createEmployeeSale(req, res) {
  const { payment_id, user_id, team_id, team_leader_id, parent_team_leader_id, sale_percentage, sale_amount, remarks } = req.body;

  try {
    const newSale = new EmployeeSales({
      payment_id,
      user_id,
      team_id,
      team_leader_id,
      parent_team_leader_id,
      sale_percentage,
      sale_amount,
      remarks,
    });

    const savedSale = await newSale.save();
    res.status(201).json({ success: true, data: savedSale });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function updateEmployeeSale(req, res) {
  try {
    const updatedSale = await EmployeeSales.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedSale) return res.status(404).json({ success: false, message: 'Sale not found' });
    res.status(200).json({ success: true, data: updatedSale });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function deleteEmployeeSale(req, res) {
  try {
    const deletedSale = await EmployeeSales.findByIdAndUpdate(req.params.id, { deleted_at: new Date() }, { new: true });
    if (!deletedSale) return res.status(404).json({ success: false, message: 'Sale not found' });
    res.status(200).json({ success: true, message: 'Sale record soft deleted', data: deletedSale });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = {
  getAllEmployeeSales,
  getEmployeeSaleById,
  createEmployeeSale,
  updateEmployeeSale,
  deleteEmployeeSale,
};
