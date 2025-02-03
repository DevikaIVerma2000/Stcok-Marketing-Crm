const Invoice = require('../models/invoicesModel');

// Get all invoices
const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
      .populate('customer_id')
      .populate('payment_id')
      .populate('branch_id')
      .populate('finalized_by')
      .populate('created_by');
    res.status(200).json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new invoice
const createInvoice = async (req, res) => {
  try {
    const { proforma_date, invoice_number, customer_id, payment_id, branch_id, particulars, customer_data, company_data, created_by } = req.body;
    
    const newInvoice = new Invoice({
      proforma_date,
      invoice_number,
      customer_id,
      payment_id,
      branch_id,
      particulars,
      customer_data,
      company_data,
      created_by,
    });

    await newInvoice.save();
    res.status(201).json(newInvoice);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update an invoice
const updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    const { proforma_date, invoice_number, customer_id, payment_id, branch_id, particulars, customer_data, company_data } = req.body;
    invoice.proforma_date = proforma_date || invoice.proforma_date;
    invoice.invoice_number = invoice_number || invoice.invoice_number;
    invoice.customer_id = customer_id || invoice.customer_id;
    invoice.payment_id = payment_id || invoice.payment_id;
    invoice.branch_id = branch_id || invoice.branch_id;
    invoice.particulars = particulars || invoice.particulars;
    invoice.customer_data = customer_data || invoice.customer_data;
    invoice.company_data = company_data || invoice.company_data;

    await invoice.save();
    res.status(200).json(invoice);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an invoice
const deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    await invoice.remove();
    res.status(200).json({ message: 'Invoice deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllInvoices,
  createInvoice,
  updateInvoice,
  deleteInvoice,
};
