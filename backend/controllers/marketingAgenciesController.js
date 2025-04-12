const MarketingAgency = require("../models/marketingAgenciesModel");
const User = require("../models/userModel");
const UserAuth = require("../models/userAuthModel");
const Branch = require("../models/branchesModel");

// Create a new marketing agency
const createMarketingAgency = async (req, res) => {
  try {
    const { agency_name, agency_description } = req.body;
    const user = req.user;

    if (!agency_name || agency_name.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Agency name is required" });
    }
    if (agency_name.length > 30) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Agency name must be 30 characters or less",
        });
    }
    if (!agency_description || agency_description.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Agency description is required" });
    }
    if (agency_description.length > 60) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Description must be 60 characters or less",
        });
    }
    if (!user?.id || !user?.branch_id) {
      return res
        .status(400)
        .json({
          success: false,
          message: "User or branch information missing",
        });
    }

    // Duplicate check
    const existingAgency = await MarketingAgency.findOne({
      agency_name: agency_name.trim(),
      branch_id: user.branch_id,
      deleted_at: null,
    });
    if (existingAgency) {
      return res.status(400).json({
        success: false,
        message: `Agency "${agency_name}" already exists for this branch`,
      });
    }

    // Check if the user is linked to a valid branch
    const userAuth = await UserAuth.findById(user.id);
    if (!userAuth) throw new Error("UserAuth not found");

   
    const agency = new MarketingAgency({
      agency_name: agency_name.trim(),
      agency_description: agency_description.trim(),
      created_by: userAuth.user_id, 
      branch_id: user.branch_id,
    });
    const savedAgency = await agency.save();

    // Get creator's name
    const userDoc = await User.findById(userAuth.user_id).select("full_name");
    if (!userDoc) throw new Error("User not found");

    res.status(201).json({
      success: true,
      message: "Marketing agency created successfully",
      data: {
        id: savedAgency._id,
        agency_name: savedAgency.agency_name,
        agency_description: savedAgency.agency_description,
        created_by: userDoc.full_name || "Unknown",
        created_on: savedAgency.created_at.toISOString().split("T")[0],
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating marketing agency",
      error: error.message,
    });
  }
};

// Get all marketing agencies
const getAllMarketingAgencies = async (req, res) => {
  try {
    const user = req.user;
    if (!user?.id || !user?.branch_id) {
      return res
        .status(400)
        .json({
          success: false,
          message: "User or branch information missing",
        });
    }

    const [agencies, totalAgencies] = await Promise.all([
      MarketingAgency.find({ branch_id: user.branch_id, deleted_at: null })
        .populate("created_by", "full_name")
        .populate("branch_id", "name"),
      MarketingAgency.countDocuments({
        branch_id: user.branch_id,
        deleted_at: null,
      }),
    ]);

    const formattedAgencies = agencies.map((agency) => ({
      id: agency._id,
      source_name: agency.agency_name,
      source_description: agency.agency_description,
      created: agency.created_by?.full_name || "Unknown",
      created_on: agency.created_at.toISOString().split("T")[0],
      actions: {
        edit: `/marketingAgencies/edit/${agency._id}`,
        delete: `/marketingAgencies/delete/${agency._id}`,
      },
    }));

    res.status(200).json({
      success: true,
      message: "Marketing agencies retrieved",
      total: totalAgencies,
      data: formattedAgencies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching marketing agencies",
      error: error.message,
    });
  }
};

// Get marketing agency by ID
const getMarketingAgencyById = async (req, res) => {
  try {
    const { id } = req.params;

    const agency = await MarketingAgency.findOne({
      _id: id,
      deleted_at: null,
    }).populate("created_by", "full_name");

    if (!agency) {
      return res
        .status(404)
        .json({ success: false, message: "Marketing agency not found" });
    }

    res.status(200).json({
      success: true,
      message: "Marketing agency retrieved successfully",
      data: {
        id: agency._id,
        source_name: agency.agency_name,
        source_description: agency.agency_description,
        created: agency.created_by?.full_name || "Unknown",
        created_on: agency.created_at.toISOString().split("T")[0],
        updated_at: agency.updated_at.toISOString().split("T")[0] || null,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching marketing agency",
      error: error.message,
    });
  }
};

// Update marketing agency
const updateMarketingAgency = async (req, res) => {
  try {
    const { id } = req.params;
    const { agency_name, agency_description } = req.body;
    const user = req.user;

    if (!user?.id || !user?.branch_id) {
      return res
        .status(400)
        .json({
          success: false,
          message: "User or branch information missing",
        });
    }

    if (!agency_name && !agency_description) {
      return res.status(400).json({
        success: false,
        message:
          "At least one field (agency_name or agency_description) must be provided",
      });
    }

    if (agency_name && agency_name.trim() === "") {
      return res
        .status(400)
        .json({ success: false, message: "Agency name cannot be empty" });
    }
    if (agency_name && agency_name.length > 30) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Agency name must be 30 characters or less",
        });
    }
    if (agency_description && agency_description.trim() === "") {
      return res
        .status(400)
        .json({
          success: false,
          message: "Agency description cannot be empty",
        });
    }
    if (agency_description && agency_description.length > 60) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Description must be 60 characters or less",
        });
    }

    const agency = await MarketingAgency.findOne({
      _id: id,
      branch_id: user.branch_id,
      deleted_at: null,
    });
    if (!agency) {
      return res
        .status(404)
        .json({ success: false, message: "Marketing agency not found" });
    }

    if (agency_name) {
      const existingAgency = await MarketingAgency.findOne({
        agency_name: agency_name.trim(),
        branch_id: user.branch_id,
        _id: { $ne: id },
        deleted_at: null,
      });
      if (existingAgency) {
        return res.status(400).json({
          success: false,
          message: `Agency "${agency_name}" already exists for this branch`,
        });
      }
    }

    const updateData = {};
    if (agency_name) updateData.agency_name = agency_name.trim();
    if (agency_description)
      updateData.agency_description = agency_description.trim();
    updateData.updated_at = new Date();

    const updatedAgency = await MarketingAgency.findOneAndUpdate(
      { _id: id, branch_id: user.branch_id, deleted_at: null },
      updateData,
      { new: true, runValidators: true }
    )
      .populate("created_by", "full_name")
      .populate("branch_id", "name");

    if (!updatedAgency) {
      return res
        .status(404)
        .json({ success: false, message: "Marketing agency not found" });
    }

    res.status(200).json({
      success: true,
      message: "Marketing agency updated successfully",
      data: {
        id: updatedAgency._id,
        source_name: updatedAgency.agency_name,
        source_description: updatedAgency.agency_description,
        created: updatedAgency.created_by?.full_name || "Unknown",
        created_on: updatedAgency.created_at.toISOString().split("T")[0],
        branch: updatedAgency.branch_id?.name || "Unknown",
        updated_at: updatedAgency.updated_at.toISOString().split("T")[0],
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating marketing agency",
      error: error.message,
    });
  }
};

// Delete marketing agency
const deleteMarketingAgency = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;
    if (!user?.id || !user?.branch_id) {
      return res
        .status(400)
        .json({
          success: false,
          message: "User or branch information missing",
        });
    }

    const agency = await MarketingAgency.findByIdAndDelete(
      { _id: id, branch_id: user.branch_id, deleted_at: null },
      { deleted_at: new Date() },
      { new: true }
    );

    if (!agency) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Marketing agency not found or already deleted",
        });
    }

    res.status(200).json({
      success: true,
      message: "Marketing agency deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting marketing agency",
      error: error.message,
    });
  }
};

module.exports = {
  createMarketingAgency,
  getAllMarketingAgencies,
  getMarketingAgencyById,
  updateMarketingAgency,
  deleteMarketingAgency,
};
