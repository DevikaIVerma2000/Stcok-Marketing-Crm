const Customer = require('../models/customerModel'); 

const createCustomer = async (req, res) => {
    try {
        const { email_id } = req.body;
        const existingCustomer = await Customer.findOne({ email_id });
        if (existingCustomer) {
            return res.status(400).json({
                success: false,
                message: 'A customer with this email already exists',
            });
        }

        const customer = new Customer(req.body);
        await customer.save();

        return res.status(201).json({
            success: true,
            message: 'Customer created successfully',
            data: customer,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to create customer',
            error: error.message,
        });
    }
};


const getAllCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        return res.status(200).json({
            success: true,
            message: 'Customers retrieved successfully',
            data: customers,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve customers',
            error: error.message,
        });
    }
};

const getCustomerById = async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await Customer.findById(id); 

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: 'Customer not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Customer retrieved successfully',
            data: customer,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to retrieve customer',
            error: error.message,
        });
    }
};

const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCustomer = await Customer.findByIdAndUpdate(id, req.body, {
            new: true, 
            runValidators: true, 
        });

        if (!updatedCustomer) {
            return res.status(404).json({
                success: false,
                message: 'Customer not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Customer updated successfully',
            data: updatedCustomer,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to update customer',
            error: error.message,
        });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCustomer = await Customer.findByIdAndDelete(id);

        if (!deletedCustomer) {
            return res.status(404).json({
                success: false,
                message: 'Customer not found',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Customer deleted successfully',
            data: deletedCustomer,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to delete customer',
            error: error.message,
        });
    }
};

// Export all functions
module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
};
