const TeamMember = require('../models/teamMembersModel');

// Create a new team member
const createTeamMember = async (req, res) => {
  try {
    const newTeamMember = new TeamMember(req.body);
    await newTeamMember.save();
    res.status(201).json({
      success: true,
      message: 'Team member created successfully',
      data: newTeamMember,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating team member',
      error: error.message,
    });
  }
};

// Get all team members
const getAllTeamMembers = async (req, res) => {
  try {
    const teamMembers = await TeamMember.find();
    res.status(200).json({
      success: true,
      message: 'Team members retrieved successfully',
      data: teamMembers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching team members',
      error: error.message,
    });
  }
};

// Get team member by ID
const getTeamMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const teamMember = await TeamMember.findById(id);

    if (!teamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Team member retrieved successfully',
      data: teamMember,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching team member',
      error: error.message,
    });
  }
};

// Update team member by ID
const updateTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTeamMember = await TeamMember.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTeamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Team member updated successfully',
      data: updatedTeamMember,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating team member',
      error: error.message,
    });
  }
};

// Delete team member by ID
const deleteTeamMember = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTeamMember = await TeamMember.findByIdAndDelete(id);

    if (!deletedTeamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Team member deleted successfully',
      data: deletedTeamMember,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting team member',
      error: error.message,
    });
  }
};

module.exports = {
  createTeamMember,
  getAllTeamMembers,
  getTeamMemberById,
  updateTeamMember,
  deleteTeamMember,
};
