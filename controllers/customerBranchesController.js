const CustomerBranch = require('../models/customerBranchesModel');

const createCustomerBranch = async (req, res) => {
    try {
        const { customer_id, branch_id, user_id, created_by } = req.body;

        // Ensure all required fields are present
        if (!customer_id || !branch_id || !user_id || !created_by) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const newBranch = new CustomerBranch({ customer_id, branch_id, user_id, created_by });
        await newBranch.save();

        return res.status(201).json({ msg: "Customer branch created successfully", branch: newBranch });
    } catch (err) {
        return res.status(500).json({ msg: "Internal server error", error: err.message });
    }
};

// Get all customer branches with populated data
const getAllCustomerBranches = async (req, res) => {
    try {
        const branches = await CustomerBranch.find()
            .populate('customer_id', 'name')  
            .populate('branch_id', 'name location')  
            .populate('user_id', 'username email')  
            .populate('created_by', 'username');

        return res.status(200).json(branches);
    } catch (err) {
        return res.status(500).json({ msg: "Internal server error", error: err.message });
    }
};

// Get a customer branch by ID with populated data
const getCustomerBranchById = async (req, res) => {
    try {
        const { id } = req.params;
        const branch = await CustomerBranch.findById(id)
            .populate('customer_id', 'name')
            .populate('branch_id', 'name location')
            .populate('user_id', 'username email')
            .populate('created_by', 'username');

        if (!branch) {
            return res.status(404).json({ msg: "Customer branch not found" });
        }
        return res.status(200).json(branch);
    } catch (err) {
        return res.status(500).json({ msg: "Internal server error", error: err.message });
    }
};

// Update a customer branch by ID
const updateCustomerBranch = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updatedBranch = await CustomerBranch.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
            .populate('customer_id', 'name')
            .populate('branch_id', 'name location')
            .populate('user_id', 'username email')
            .populate('created_by', 'username');

        if (!updatedBranch) {
            return res.status(404).json({ msg: "Customer branch not found" });
        }
        return res.status(200).json({ msg: "Customer branch updated successfully", branch: updatedBranch });
    } catch (err) {
        return res.status(500).json({ msg: "Internal server error", error: err.message });
    }
};

// Soft delete a customer branch (set deleted_at timestamp)
const deleteCustomerBranch = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBranch = await CustomerBranch.findByIdAndUpdate(id, { deleted_at: new Date() }, { new: true });

        if (!deletedBranch) {
            return res.status(404).json({ msg: "Customer branch not found" });
        }
        return res.status(200).json({ msg: "Customer branch deleted successfully", branch: deletedBranch });
    } catch (err) {
        return res.status(500).json({ msg: "Internal server error", error: err.message });
    }
};

module.exports = {
    createCustomerBranch,
    getAllCustomerBranches,
    getCustomerBranchById,
    updateCustomerBranch,
    deleteCustomerBranch
};
