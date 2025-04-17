const Team = require("../models/teamsModel");
const TeamLeader = require("../models/teamLeaderModel");
const TeamMember = require("../models/teamMembersModel");
const mongoose = require("mongoose");

// Helper function to fetch team details
const getTeamDetails = async (teamId) => {
  const team = await Team.findById(teamId).select(
    "team_name status is_name_editable"
  );
  if (!team || team.status === "inactive" || team.deleted_at) return null;

  const teamLeader = await TeamLeader.findOne({
    team_id: new mongoose.Types.ObjectId(teamId),
    deleted_at: null,
  }).select("team_leader_id parent_team_leader_id");
  console.log("Team Leader Query Result:", teamLeader);

  const teamMembers = await TeamMember.find({
    team_id: new mongoose.Types.ObjectId(teamId),
    deleted_at: null,
  }).select("team_member_id deleted_at");
  console.log("Team Members Query Result (active only):", teamMembers);

  // Debug: Fetch all members to see deleted ones
  const allTeamMembers = await TeamMember.find({
    team_id: new mongoose.Types.ObjectId(teamId),
  }).select("team_member_id deleted_at");
  console.log("All Team Members (including deleted):", allTeamMembers);

  return {
    id: team._id,
    team_name: team.team_name,
    team_leader: teamLeader
      ? `Team Leader ${teamLeader.team_leader_id}`
      : "No Team Leader Assigned",
    team_manager: teamLeader?.parent_team_leader_id
      ? `Team Manager ${teamLeader.parent_team_leader_id}`
      : "No Team Manager Assigned",
    team_members: teamMembers.map((member) => `Agent ${member.team_member_id}`),
    team_members_count: teamMembers.length,
    action: team.status === "inactive" ? "Disabled" : "Disable",
    is_name_editable: team.is_name_editable,
  };
};

// Create a new team
const createTeam = async (req, res) => {
  try {
    const { team_name } = req.body;
    const { id: userId, branch_id: branchId } = req.user;

    if (!team_name) {
      return res
        .status(400)
        .json({ success: false, message: "Team name is required" });
    }

    const existingTeam = await Team.findOne({ team_name, deleted_at: null });
    if (existingTeam) {
      return res
        .status(409)
        .json({ success: false, message: "Team name already exists" });
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
    res
      .status(500)
      .json({
        success: false,
        message: "Error creating team",
        error: error.message,
      });
  }
};

// Get all teams with pagination
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
        const details = await getTeamDetails(team._id);
        return (
          details || {
            id: team._id,
            team_name: team.team_name,
            team_leader: "No Team Leader Assigned",
            team_manager: "No Team Manager Assigned",
            team_members_count: 0,
            action: team.status === "inactive" ? "Disabled" : "Disable",
            is_name_editable: team.is_name_editable,
          }
        );
      })
    );

    const total = await Team.countDocuments({ deleted_at: null });
    res.status(200).json({
      success: true,
      message: "Teams retrieved successfully",
      data: teamDetails,
      total,
      showing: `${startIndex + 1} to ${Math.min(
        startIndex + limit,
        total
      )} of ${total} entries`,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching teams",
        error: error.message,
      });
  }
};
// Get team by ID
const getTeamById = async (req, res) => {
  try {
    const { team_id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(team_id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid team ID" });
    }

    const teamDetails = await getTeamDetails(team_id);
    if (!teamDetails) {
      return res
        .status(200)
        .json({ success: false, message: "Team not found", data: null });
    }

    res.status(200).json({
      success: true,
      message: "Team retrieved successfully",
      data: teamDetails,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching team",
        error: error.message,
      });
  }
};

// Update team management (leader, manager, members)
const updateTeamManagement = async (req, res) => {
  try {
    const { team_id } = req.params;
    const { team_leader_id, team_manager_id, team_member_ids } = req.body;
    const { id: userId, branch_id: branchId } = req.user;

    if (!mongoose.Types.ObjectId.isValid(team_id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid team ID" });
    }

    const team = await Team.findById(team_id).select("status");
    if (!team || team.status === "inactive" || team.deleted_at) {
      return res
        .status(404)
        .json({ success: false, message: "Team not found or disabled" });
    }

    // Validate and assign team leader and manager in a single document
    if (!team_leader_id) {
      return res
        .status(400)
        .json({ success: false, message: "Team leader is required" });
    }

    // Delete existing team leader/manager records for this team
    await TeamLeader.deleteMany({
      team_id: new mongoose.Types.ObjectId(team_id),
      deleted_at: null,
    });

    // Create a new TeamLeader document
    const newTeamLeader = new TeamLeader({
      team_id: new mongoose.Types.ObjectId(team_id),
      team_leader_id: new mongoose.Types.ObjectId(team_leader_id),
      parent_team_leader_id: team_manager_id
        ? new mongoose.Types.ObjectId(team_manager_id)
        : null,
      created_by: userId,
      branch_id: branchId,
    });
    await newTeamLeader.save();
    console.log(
      "Team Leader saved with _id:",
      newTeamLeader._id,
      "team_leader_id:",
      team_leader_id,
      "parent_team_leader_id:",
      team_manager_id
    );

    // Assign or update team members
    if (team_member_ids?.length) {
      await TeamMember.deleteMany({
        team_id: new mongoose.Types.ObjectId(team_id),
        deleted_at: null,
      });
      const memberDocs = team_member_ids.map((memberId) => ({
        team_id: new mongoose.Types.ObjectId(team_id),
        team_member_id: new mongoose.Types.ObjectId(memberId),
        created_by: userId,
        branch_id: branchId,
      }));
      await TeamMember.insertMany(memberDocs);
      console.log("Team members updated:", team_member_ids);
    }

    const teamDetails = await getTeamDetails(team_id);
    if (!teamDetails.team_leader) {
      console.warn("Team leader not found in details for team_id:", team_id);
    }
    res.status(200).json({
      success: true,
      message: "Team management updated successfully",
      data: teamDetails,
    });
  } catch (error) {
    console.error("Overall error:", error.message);
    res
      .status(500)
      .json({
        success: false,
        message: "Error updating team management",
        error: error.message,
      });
  }
};
// Update team status
const updateTeam = async (req, res) => {
  try {
    const { team_id } = req.params;
    const { status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(team_id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid team ID" });
    }

    const team = await Team.findById(team_id);
    if (!team || team.deleted_at) {
      return res
        .status(200)
        .json({ success: false, message: "Team not found", data: null });
    }

    const updates = { updated_at: Date.now() };
    if (status && ["active", "inactive"].includes(status)) {
      updates.status = status;
    }

    const updatedTeam = await Team.findByIdAndUpdate(team_id, updates, {
      new: true,
      runValidators: true,
    });
    const teamDetails = (await getTeamDetails(team_id)) || {
      id: updatedTeam._id,
      team_name: updatedTeam.team_name,
      team_leader: "No Team Leader Assigned",
      team_manager: "No Team Manager Assigned",
      team_members_count: 0,
      action: updatedTeam.status === "inactive" ? "Disabled" : "Disable",
      is_name_editable: updatedTeam.is_name_editable,
    };

    res.status(200).json({
      success: true,
      message: "Team updated successfully",
      data: teamDetails,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error updating team",
        error: error.message,
      });
  }
};

// Delete team - soft delete
const deleteTeam = async (req, res) => {
  try {
    const { team_id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(team_id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid team ID" });
    }

    const team = await Team.findById(team_id);
    if (!team || team.deleted_at) {
      return res
        .status(200)
        .json({ success: false, message: "Team not found", data: null });
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
    res
      .status(500)
      .json({
        success: false,
        message: "Error deleting team",
        error: error.message,
      });
  }
};

// Manage team member -  (add or remove)
const manageTeamMember = async (req, res) => {
  try {
    const { team_id, team_member_id } = req.params;
    const { action } = req.body;
    const { id: userId, branch_id: branchId } = req.user;

    if (
      !mongoose.Types.ObjectId.isValid(team_id) ||
      !mongoose.Types.ObjectId.isValid(team_member_id)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid team ID or team member ID" });
    }

    const team = await Team.findById(team_id).select("status");
    if (!team || team.status === "inactive" || team.deleted_at) {
      return res
        .status(404)
        .json({ success: false, message: "Team not found or disabled" });
    }

    if (action === "add") {
      const newTeamMember = new TeamMember({
        team_id: new mongoose.Types.ObjectId(team_id),
        team_member_id: new mongoose.Types.ObjectId(team_member_id),
        created_by: userId,
        branch_id: branchId,
      });
      await newTeamMember.save();
      console.log("Added Team Member:", newTeamMember.toObject());
      res.status(201).json({
        success: true,
        message: "Team member added successfully",
        data: { team_id, team_member_id },
      });
    } else if (action === "remove") {
      const query = {
        team_id: new mongoose.Types.ObjectId(team_id),
        team_member_id: new mongoose.Types.ObjectId(team_member_id),
        deleted_at: null,
      };
      const update = { $set: { deleted_at: Date.now(), updated_by: userId } };
      const options = {
        new: true,
        runValidators: true,
        select: "team_id team_member_id deleted_at updated_by",
      };

      const deletedTeamMember = await TeamMember.findOneAndUpdate(
        query,
        update,
        options
      );
      console.log(
        "Removed Team Member Document:",
        deletedTeamMember ? deletedTeamMember.toObject() : null
      );

      if (!deletedTeamMember) {
        return res
          .status(404)
          .json({ success: false, message: "Team member not found" });
      }
      res.status(200).json({
        success: true,
        message: "Team member removed successfully",
        data: { team_id, team_member_id },
      });
    } else {
      return res
        .status(400)
        .json({
          success: false,
          message: "Invalid action. Use 'add' or 'remove'",
        });
    }
  } catch (error) {
    console.error("Error managing team member:", error.message, error.stack);
    res
      .status(500)
      .json({
        success: false,
        message: "Error managing team member",
        error: error.message,
      });
  }
};
// Assign team leader or manager
const assignRole = async (req, res) => {
  try {
    const { team_id } = req.params;
    const { role_id, role_type } = req.body;
    const { id: userId, branch_id: branchId } = req.user;

    if (!mongoose.Types.ObjectId.isValid(team_id) || !role_id) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid team ID or role ID" });
    }

    const team = await Team.findById(team_id).select("status");
    if (!team || team.status === "inactive" || team.deleted_at) {
      return res
        .status(404)
        .json({ success: false, message: "Team not found or disabled" });
    }

    if (role_type === "leader") {
      await TeamLeader.deleteMany({
        team_id: new mongoose.Types.ObjectId(team_id),
        deleted_at: null,
        parent_team_leader_id: null,
      });
      const newTeamLeader = new TeamLeader({
        team_id: new mongoose.Types.ObjectId(team_id),
        team_leader_id: new mongoose.Types.ObjectId(role_id),
        parent_team_leader_id: null,
        created_by: userId,
        branch_id: branchId,
      });
      await newTeamLeader.save();
      res.status(201).json({
        success: true,
        message: "Team leader assigned successfully",
        data: { team_id, team_leader_id: role_id },
      });
    } else if (role_type === "manager") {
      await TeamLeader.deleteMany({
        team_id: new mongoose.Types.ObjectId(team_id),
        deleted_at: null,
        parent_team_leader_id: { $exists: true, $ne: null },
      });
      if (role_id) {
        const newTeamManager = new TeamLeader({
          team_id: new mongoose.Types.ObjectId(team_id),
          team_leader_id: new mongoose.Types.ObjectId(role_id),
          parent_team_leader_id: null,
          created_by: userId,
          branch_id: branchId,
        });
        await newTeamManager.save();
      }
      res.status(201).json({
        success: true,
        message: "Team manager assigned successfully",
        data: { team_id, team_manager_id: role_id || null },
      });
    } else {
      return res
        .status(400)
        .json({
          success: false,
          message: "Invalid role type. Use 'leader' or 'manager'",
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error assigning role",
        error: error.message,
      });
  }
};

module.exports = {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeamManagement,
  updateTeam,
  deleteTeam,
  manageTeamMember,
  assignRole,
};
