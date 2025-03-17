const Team = require('../models/teamsModel');

// Create a new team
const createTeam = async (req, res) => {
  try {
    const newTeam = new Team(req.body);
    await newTeam.save();
    res.status(201).json({
      success: true,
      message: 'Team created successfully',
      data: newTeam,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating team',
      error: error.message,
    });
  }
};

// Get all teams
const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).json({
      success: true,
      message: 'Teams retrieved successfully',
      data: teams,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching teams',
      error: error.message,
    });
  }
};

// Get team by ID
const getTeamById = async (req, res) => {
  try {
    const { id } = req.params;
    const team = await Team.findById(id);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Team retrieved successfully',
      data: team,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching team',
      error: error.message,
    });
  }
};

// Update team by ID
const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTeam = await Team.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedTeam) {
      return res.status(404).json({
        success: false,
        message: 'Team not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Team updated successfully',
      data: updatedTeam,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating team',
      error: error.message,
    });
  }
};

// Delete team by ID
const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTeam = await Team.findByIdAndDelete(id);

    if (!deletedTeam) {
      return res.status(404).json({
        success: false,
        message: 'Team not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Team deleted successfully',
      data: deletedTeam,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting team',
      error: error.message,
    });
  }
};

module.exports = {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
};
