const TeamLeader = require("../models/teamLeaderModel");

// Create a new team leader
const createTeamLeader = async (req, res) => {
  try {
    const { team_leader_id } = req.body;

    // Check if team_leader_id already exists
    const existingLeader = await TeamLeader.findOne({ team_leader_id });
    if (existingLeader) {
      return res.status(400).json({
        success: false,
        message: "Team leader with this ID already exists",
      });
    }

    const newTeamLeader = new TeamLeader(req.body);
    await newTeamLeader.save();
    res.status(201).json({
      success: true,
      message: "Team leader created successfully",
      data: newTeamLeader,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating team leader",
      error: error.message,
    });
  }
};

// Get all team leaders
const getAllTeamLeaders = async (req, res) => {
  try {
    const teamLeaders = await TeamLeader.find()
      .populate("team_id", "name") 
      .populate("parent_team_leader_id", "team_leader_id") 
      .populate("created_by", "username") 
      .populate("branch_id", "branch_name"); 

    res.status(200).json({
      success: true,
      message: "Team leaders retrieved successfully",
      data: teamLeaders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching team leaders",
      error: error.message,
    });
  }
};

// Get team leader by ID
const getTeamLeaderById = async (req, res) => {
  try {
    const { id } = req.params;
    const teamLeader = await TeamLeader.findById(id)
      .populate("team_id", "name")
      .populate("parent_team_leader_id", "team_leader_id")
      .populate("created_by", "username")
      .populate("branch_id", "branch_name");

    if (!teamLeader) {
      return res.status(404).json({
        success: false,
        message: "Team leader not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Team leader retrieved successfully",
      data: teamLeader,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching team leader",
      error: error.message,
    });
  }
};

// Update team leader by ID
const updateTeamLeader = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTeamLeader = await TeamLeader.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTeamLeader) {
      return res.status(404).json({
        success: false,
        message: "Team leader not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Team leader updated successfully",
      data: updatedTeamLeader,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating team leader",
      error: error.message,
    });
  }
};

// Soft Delete team leader by ID
const deleteTeamLeader = async (req, res) => {
  try {
    const { id } = req.params;

    // Soft delete by setting `deleted_at`
    const deletedTeamLeader = await TeamLeader.findByIdAndUpdate(
      id,
      { deleted_at: new Date() },
      { new: true }
    );

    if (!deletedTeamLeader) {
      return res.status(404).json({
        success: false,
        message: "Team leader not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Team leader deleted successfully",
      data: deletedTeamLeader,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting team leader",
      error: error.message,
    });
  }
};

module.exports = {
  createTeamLeader,
  getAllTeamLeaders,
  getTeamLeaderById,
  updateTeamLeader,
  deleteTeamLeader,
};
