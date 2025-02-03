const CustomerBranch = require('../models/customerBranchesModel');

// Create a new customer branch
const createCustomerBranch = async (req, res) => {
    try {
        const branchData = req.body;
        const newBranch = new CustomerBranch(branchData);
        await newBranch.save();
        return res.status(201).json({ msg: "Customer branch created successfully", branch: newBranch });
    } catch (err) {
        return res.status(500).json({ msg: "Internal server error", error: err.message });
    }
};

// Get all customer branches
const getAllCustomerBranches = async (req, res) => {
    try {
        const branches = await CustomerBranch.find();
        return res.status(200).json(branches);
    } catch (err) {
        return res.status(500).json({ msg: "Internal server error", error: err.message });
    }
};

// Get a customer branch by ID
const getCustomerBranchById = async (req, res) => {
    try {
        const { id } = req.params;
        const branch = await CustomerBranch.findById(id);
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
        const updatedBranch = await CustomerBranch.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (!updatedBranch) {
            return res.status(404).json({ msg: "Customer branch not found" });
        }
        return res.status(200).json({ msg: "Customer branch updated successfully", branch: updatedBranch });
    } catch (err) {
        return res.status(500).json({ msg: "Internal server error", error: err.message });
    }
};

// Delete a customer branch by ID
const deleteCustomerBranch = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBranch = await CustomerBranch.findByIdAndDelete(id);
        if (!deletedBranch) {
            return res.status(404).json({ msg: "Customer branch not found" });
        }
        return res.status(200).json({ msg: "Customer branch deleted successfully" });
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
