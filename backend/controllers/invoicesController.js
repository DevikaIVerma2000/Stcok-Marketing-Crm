const Invoice = require('../models/invoicesModel');

// Create a new invoice
const createInvoice = async (req, res) => {
    try {
        const { proforma_date, invoice_number, customer_id, payment_id, branch_id, particulars, customer_data, company_data, invoice_finalized, email_count, finalized_date, finalized_by, created_by } = req.body;

        // Validate required fields
        if (!proforma_date || !invoice_number || !customer_id || !payment_id || !branch_id || !created_by) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
            });
        }

        const invoice = new Invoice({
            proforma_date,
            invoice_number,
            customer_id,
            payment_id,
            branch_id,
            particulars,
            customer_data,
            company_data,
            invoice_finalized,
            email_count,
            finalized_date,
            finalized_by,
            created_by
        });

        await invoice.save();

        return res.status(201).json({
            success: true,
            message: "Invoice created successfully",
            data: invoice,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to create invoice",
            error: error.message,
        });
    }
};

// Retrieve all invoices
const getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find().populate('customer_id payment_id branch_id finalized_by created_by');
        return res.status(200).json({
            success: true,
            message: "Invoices retrieved successfully",
            data: invoices,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve invoices",
            error: error.message,
        });
    }
};

// Retrieve a single invoice by ID
const getInvoiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await Invoice.findById(id).populate('customer_id payment_id branch_id finalized_by created_by');

        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: "Invoice not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Invoice retrieved successfully",
            data: invoice,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to retrieve invoice",
            error: error.message,
        });
    }
};

// Update invoice details
const updateInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedInvoice = await Invoice.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedInvoice) {
            return res.status(404).json({
                success: false,
                message: "Invoice not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Invoice updated successfully",
            data: updatedInvoice,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to update invoice",
            error: error.message,
        });
    }
};

// Soft delete invoice 
const deleteInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedInvoice = await Invoice.findByIdAndUpdate(id, { deleted_at: new Date() }, { new: true });

        if (!deletedInvoice) {
            return res.status(404).json({
                success: false,
                message: "Invoice not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Invoice deleted successfully",
            data: deletedInvoice,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to delete invoice",
            error: error.message,
        });
    }
};

module.exports = {
    createInvoice,
    getAllInvoices,
    getInvoiceById,
    updateInvoice,
    deleteInvoice,
};
