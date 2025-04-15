const Team = require("../models/teamsModel");
const TeamLeader = require("../models/teamLeaderModel");
const TeamMember = require("../models/teamMembersModel");
const mongoose = require("mongoose");

// Create a new team
const createTeam = async (req, res) => {
  try {
    const { team_name } = req.body;
    const { id: userId, branch_id: branchId } = req.user;

    if (!team_name) {
      return res.status(400).json({ success: false, message: "Team name is required" });
    }

    const existingTeam = await Team.findOne({ team_name, deleted_at: null });
    if (existingTeam) {
      return res.status(409).json({ success: false, message: "Team name already exists" });
    }

    const newTeam = new Team({
      team_name,
      created_by: userId,
      branch_id: branchId,
      status: "active",
      is_name_editable: false,
    });
    const savedTeam = await newTeam.save();

    res.status(201).json({
      success: true,
      message: "Team created successfully",
      data: {
        id: savedTeam._id,
        team_name: savedTeam.team_name,
        team_leader: "No Team Leader Assigned",
        team_manager: "No Team Manager Assigned",
        team_members_count: 0,
        action: "Disable",
        is_name_editable: false,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error creating team", error: error.message });
  }
};

// Get all teams
const getAllTeams = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;

    const teams = await Team.find({ deleted_at: null })
      .skip(startIndex)
      .limit(limit)
      .select("team_name status is_name_editable");

    const teamDetails = await Promise.all(
      teams.map(async (team) => {
        const teamLeader = await TeamLeader.findOne({
          team_id: team._id,
          deleted_at: null,
          parent_team_leader_id: null,
        }).select("team_leader_id");
        const teamManager = await TeamLeader.findOne({
          team_id: team._id,
          deleted_at: null,
          parent_team_leader_id: { $exists: true },
        }).select("parent_team_leader_id");
        const teamMembersCount = await TeamMember.countDocuments({ team_id: team._id, deleted_at: null });

        return {
          id: team._id,
          team_name: team.team_name,
          team_leader: teamLeader ? `Team Leader ${teamLeader.team_leader_id}` : "No Team Leader Assigned",
          team_manager: teamManager ? `Team Manager ${teamManager.parent_team_leader_id}` : "No Team Manager Assigned",
          team_members_count: teamMembersCount,
          action: team.status === "inactive" ? "Disabled" : "Disable",
          is_name_editable: team.is_name_editable,
        };
      })
    );

    const total = await Team.countDocuments({ deleted_at: null });
    res.status(200).json({
      success: true,
      message: "Teams retrieved successfully",
      data: teamDetails,
      total,
      showing: `${startIndex + 1} to ${Math.min(startIndex + limit, total)} of ${total} entries`,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching teams", error: error.message });
  }
};

// Get team by ID
const getTeamById = async (req, res) => {
  try {
    const { team_id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(team_id)) {
      return res.status(400).json({ success: false, message: "Invalid team ID" });
    }

    const team = await Team.findById(team_id).select("team_name status is_name_editable");
    if (!team || team.status === "inactive" || team.deleted_at) {
      return res.status(200).json({ success: false, message: "Team not found", data: null });
    }

    const teamLeader = await TeamLeader.findOne({
      team_id: new mongoose.Types.ObjectId(team_id),
      deleted_at: null,
      parent_team_leader_id: null,
    }).select("team_leader_id");
    const teamManager = await TeamLeader.findOne({
      team_id: new mongoose.Types.ObjectId(team_id),
      deleted_at: null,
      parent_team_leader_id: { $exists: true },
    }).select("parent_team_leader_id");
    const teamMembers = await TeamMember.find({ team_id: new mongoose.Types.ObjectId(team_id), deleted_at: null }).select(
      "team_member_id"
    );

    res.status(200).json({
      success: true,
      message: "Team retrieved successfully",
      data: {
        id: team._id,
        team_name: team.team_name,
        team_leader: teamLeader ? `Team Leader ${teamLeader.team_leader_id}` : "No Team Leader Assigned",
        team_manager: teamManager ? `Team Manager ${teamManager.parent_team_leader_id}` : "No Team Manager Assigned",
        team_members: teamMembers.map((member) => `Agent ${member.team_member_id}`),
        team_members_count: teamMembers.length,
        action: team.status === "inactive" ? "Disabled" : "Disable",
        is_name_editable: team.is_name_editable,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching team", error: error.message });
  }
};

// Update team management (single TL, single manager, multiple members)
const updateTeamManagement = async (req, res) => {
  try {
    const { team_id } = req.params;
    const { team_leader_id, team_manager_id, team_member_ids } = req.body;
    const { id: userId, branch_id: branchId } = req.user;

    if (!mongoose.Types.ObjectId.isValid(team_id)) {
      return res.status(400).json({ success: false, message: "Invalid team ID" });
    }

    const team = await Team.findById(team_id).select("team_name status is_name_editable");
    if (!team || team.status === "inactive" || team.deleted_at) {
      return res.status(200).json({ success: false, message: "Team not found or disabled", data: null });
    }

    // Assign or update team leader (only one at a time)
    if (team_leader_id) {
      await TeamLeader.deleteMany({
        team_id: new mongoose.Types.ObjectId(team_id),
        deleted_at: null,
        parent_team_leader_id: null,
      });
      const newTeamLeader = new TeamLeader({
        team_id: new mongoose.Types.ObjectId(team_id),
        team_leader_id: new mongoose.Types.ObjectId(team_leader_id),
        parent_team_leader_id: null,
        created_by: userId,
        branch_id: branchId,
      });
      await newTeamLeader.save();
      console.log("Team leader assigned:", team_leader_id);
    }

    // Assign or update team manager (only one at a time)
    if (team_manager_id) {
      await TeamLeader.deleteMany({
        team_id: new mongoose.Types.ObjectId(team_id),
        deleted_at: null,
        parent_team_leader_id: { $exists: true },
      });
      const newTeamManager = new TeamLeader({
        team_id: new mongoose.Types.ObjectId(team_id),
        team_leader_id: new mongoose.Types.ObjectId(team_manager_id),
        parent_team_leader_id: new mongoose.Types.ObjectId(team_manager_id),
        created_by: userId,
        branch_id: branchId,
      });
      await newTeamManager.save();
      console.log("Team manager assigned:", team_manager_id);
    }

    // Assign multiple team members
    if (team_member_ids?.length) {
      const memberDocs = team_member_ids.map((memberId) => ({
        team_id: new mongoose.Types.ObjectId(team_id),
        team_member_id: new mongoose.Types.ObjectId(memberId),
        created_by: userId,
        branch_id: branchId,
      }));
      await TeamMember.insertMany(memberDocs);
      console.log("Team members inserted:", memberDocs.length);
    }

    // Fetch updated team details
    const teamLeader = await TeamLeader.findOne({
      team_id: new mongoose.Types.ObjectId(team_id),
      deleted_at: null,
      parent_team_leader_id: null,
    }).select("team_leader_id");
    const teamManager = await TeamLeader.findOne({
      team_id: new mongoose.Types.ObjectId(team_id),
      deleted_at: null,
      parent_team_leader_id: { $exists: true },
    }).select("parent_team_leader_id");
    const teamMembers = await TeamMember.find({ team_id: new mongoose.Types.ObjectId(team_id), deleted_at: null }).select(
      "team_member_id"
    );

    res.status(200).json({
      success: true,
      message: "Team management updated successfully",
      data: {
        id: team._id,
        team_name: team.team_name,
        team_leader: teamLeader ? `Team Leader ${teamLeader.team_leader_id}` : "No Team Leader Assigned",
        team_manager: teamManager ? `Team Manager ${teamManager.parent_team_leader_id}` : "No Team Manager Assigned",
        team_members: teamMembers.map((member) => `Agent ${member.team_member_id}`),
        team_members_count: teamMembers.length,
        action: team.status === "inactive" ? "Disabled" : "Disable",
        is_name_editable: team.is_name_editable,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating team management", error: error.message });
  }
};

// Update team status
const updateTeam = async (req, res) => {
  try {
    const { team_id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(team_id)) {
      return res.status(400).json({ success: false, message: "Invalid team ID" });
    }

    const team = await Team.findById(team_id).select("team_name status is_name_editable");
    if (!team || team.deleted_at) {
      return res.status(200).json({ success: false, message: "Team not found", data: null });
    }

    const updates = { updated_at: Date.now() };
    if (status && ["active", "inactive"].includes(status)) {
      updates.status = status;
    }

    const updatedTeam = await Team.findByIdAndUpdate(team_id, updates, { new: true, runValidators: true });

    res.status(200).json({
      success: true,
      message: "Team updated successfully",
      data: {
        id: updatedTeam._id,
        team_name: updatedTeam.team_name,
        team_leader: "No Team Leader Assigned", // Simplified, fetch if needed
        team_manager: "No Team Manager Assigned", // Simplified, fetch if needed
        team_members_count: 0, // Simplified, fetch if needed
        action: updatedTeam.status === "inactive" ? "Disabled" : "Disable",
        is_name_editable: updatedTeam.is_name_editable,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating team", error: error.message });
  }
};

// Delete team (soft delete)
const deleteTeam = async (req, res) => {
  try {
    const { team_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(team_id)) {
      return res.status(400).json({ success: false, message: "Invalid team ID" });
    }

    const team = await Team.findById(team_id).select("team_name is_name_editable");
    if (!team || team.deleted_at) {
      return res.status(200).json({ success: false, message: "Team not found", data: null });
    }

    await Team.findByIdAndUpdate(
      team_id,
      { status: "inactive", deleted_at: Date.now(), updated_at: Date.now() },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Team deleted successfully",
      data: {
        id: team._id,
        team_name: team.team_name,
        action: "Disabled",
        is_name_editable: team.is_name_editable,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting team", error: error.message });
  }
};

// Assign a team leader
const assignTeamLeader = async (req, res) => {
  try {
    const { team_id } = req.params;
    const { team_leader_id } = req.body;
    const { id: userId, branch_id: branchId } = req.user;

    if (!team_id || !team_leader_id) {
      return res.status(400).json({ success: false, message: "Team ID and leader ID are required" });
    }
    if (!mongoose.Types.ObjectId.isValid(team_id)) {
      return res.status(400).json({ success: false, message: "Invalid team ID" });
    }

    const team = await Team.findById(team_id).select("status");
    if (!team || team.status === "inactive" || team.deleted_at) {
      return res.status(400).json({ success: false, message: "Team not found or disabled" });
    }

    await TeamLeader.deleteMany({
      team_id: new mongoose.Types.ObjectId(team_id),
      deleted_at: null,
      parent_team_leader_id: null,
    });
    const newTeamLeader = new TeamLeader({
      team_id: new mongoose.Types.ObjectId(team_id),
      team_leader_id: new mongoose.Types.ObjectId(team_leader_id),
      parent_team_leader_id: null,
      created_by: userId,
      branch_id: branchId,
    });
    await newTeamLeader.save();

    res.status(201).json({
      success: true,
      message: "Team leader assigned successfully",
      data: { team_id, team_leader_id },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error assigning team leader", error: error.message });
  }
};

// Assign a team manager
const assignTeamManager = async (req, res) => {
  try {
    const { team_id } = req.params;
    const { team_manager_id } = req.body;
    const { id: userId, branch_id: branchId } = req.user;

    if (!team_id || !team_manager_id) {
      return res.status(400).json({ success: false, message: "Team ID and manager ID are required" });
    }
    if (!mongoose.Types.ObjectId.isValid(team_id)) {
      return res.status(400).json({ success: false, message: "Invalid team ID" });
    }

    const team = await Team.findById(team_id).select("status");
    if (!team || team.status === "inactive" || team.deleted_at) {
      return res.status(400).json({ success: false, message: "Team not found or disabled" });
    }

    await TeamLeader.deleteMany({
      team_id: new mongoose.Types.ObjectId(team_id),
      deleted_at: null,
      parent_team_leader_id: { $exists: true },
    });
    const newTeamManager = new TeamLeader({
      team_id: new mongoose.Types.ObjectId(team_id),
      team_leader_id: new mongoose.Types.ObjectId(team_manager_id),
      parent_team_leader_id: new mongoose.Types.ObjectId(team_manager_id),
      created_by: userId,
      branch_id: branchId,
    });
    await newTeamManager.save();

    res.status(201).json({
      success: true,
      message: "Team manager assigned successfully",
      data: { team_id, team_manager_id },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error assigning team manager", error: error.message });
  }
};

// Assign a team member
const assignTeamMember = async (req, res) => {
  try {
    const { team_id } = req.params;
    const { team_member_id } = req.body;
    const { id: userId, branch_id: branchId } = req.user;

    if (!team_id || !team_member_id) {
      return res.status(400).json({ success: false, message: "Team ID and member ID are required" });
    }
    if (!mongoose.Types.ObjectId.isValid(team_id)) {
      return res.status(400).json({ success: false, message: "Invalid team ID" });
    }

    const team = await Team.findById(team_id).select("status");
    if (!team || team.status === "inactive" || team.deleted_at) {
      return res.status(400).json({ success: false, message: "Team not found or disabled" });
    }

    const newTeamMember = new TeamMember({
      team_id: new mongoose.Types.ObjectId(team_id),
      team_member_id: new mongoose.Types.ObjectId(team_member_id),
      created_by: userId,
      branch_id: branchId,
    });
    await newTeamMember.save();

    res.status(201).json({
      success: true,
      message: "Team member assigned successfully",
      data: { team_id, team_member_id },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error assigning team member", error: error.message });
  }
};

// Remove a team member
const removeTeamMember = async (req, res) => {
  try {
    const { team_id, team_member_id } = req.params;
    const { id: userId } = req.user;

    if (!team_id || !team_member_id) {
      return res.status(400).json({ success: false, message: "Team ID and member ID are required" });
    }
    if (!mongoose.Types.ObjectId.isValid(team_id)) {
      return res.status(400).json({ success: false, message: "Invalid team ID" });
    }

    const team = await Team.findById(team_id).select("status");
    if (!team || team.status === "inactive" || team.deleted_at) {
      return res.status(400).json({ success: false, message: "Team not found or disabled" });
    }

    const deletedTeamMember = await TeamMember.findOneAndUpdate(
      {
        team_id: new mongoose.Types.ObjectId(team_id),
        team_member_id: new mongoose.Types.ObjectId(team_member_id),
        deleted_at: null,
      },
      { deleted_at: Date.now(), updated_by: userId },
      { new: true }
    );

    if (!deletedTeamMember) {
      return res.status(404).json({ success: false, message: "Team member not found" });
    }

    res.status(200).json({
      success: true,
      message: "Team member removed successfully",
      data: { team_id, team_member_id },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error removing team member", error: error.message });
  }
};

module.exports = {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeamManagement,
  updateTeam,
  deleteTeam,
  assignTeamLeader,
  assignTeamManager,
  assignTeamMember,
  removeTeamMember,
};