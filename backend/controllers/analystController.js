const AnalystsModel = require("../models/analystsModel");

// ✅ Create a New Analyst
const createAnalyst = async (req, res) => {
    try {
        const { analyst_name, analyst_license, analyst_address, analyst_primary_phone, analyst_email, analyst_fees, start_date, end_date, branch_id } = req.body;

        // Authenticate User ID (assuming it's stored in req.user from middleware)
        const createdBy = req.user._id;

        const newAnalyst = new AnalystsModel({
            analyst_name,
            analyst_license,
            analyst_address,
            analyst_primary_phone,
            analyst_email,
            analyst_fees,
            start_date,
            end_date,
            created_by: createdBy,  
            branch_id
        });

        await newAnalyst.save();
        return res.status(201).json({ success: true, data: newAnalyst });
    } catch (error) {
        console.error("Error creating analyst:", error);
        return res.status(500).json({ success: false, error: "Server Error" });
    }
};


const getAllAnalysts = async (req, res) => {
    try {
        const analysts = await AnalystsModel.find().populate("created_by", "name email");
        return res.status(200).json({ success: true, data: analysts });
    } catch (error) {
        console.error("Error fetching analysts:", error);
        return res.status(500).json({ success: false, error: "Server Error" });
    }
};


const getAnalystById = async (req, res) => {
    try {
        const { id } = req.params;
        const analyst = await AnalystsModel.findById(id).populate("created_by", "name email");

        if (!analyst) {
            return res.status(404).json({ success: false, message: "Analyst not found" });
        }

        return res.status(200).json({ success: true, data: analyst });
    } catch (error) {
        console.error("Error fetching analyst:", error);
        return res.status(500).json({ success: false, error: "Server Error" });
    }
};


const updateAnalyst = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedAnalyst = await AnalystsModel.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedAnalyst) {
            return res.status(404).json({ success: false, message: "Analyst not found" });
        }

        return res.status(200).json({ success: true, data: updatedAnalyst });
    } catch (error) {
        console.error("Error updating analyst:", error);
        return res.status(500).json({ success: false, error: "Server Error" });
    }
};


const deleteAnalyst = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedAnalyst = await AnalystsModel.findByIdAndDelete(id);

        if (!deletedAnalyst) {
            return res.status(404).json({ success: false, message: "Analyst not found" });
        }

        return res.status(200).json({ success: true, message: "Analyst deleted successfully" });
    } catch (error) {
        console.error("Error deleting analyst:", error);
        return res.status(500).json({ success: false, error: "Server Error" });
    }
};

module.exports = {
    createAnalyst,
    getAllAnalysts,
    getAnalystById,
    updateAnalyst,
    deleteAnalyst
};
