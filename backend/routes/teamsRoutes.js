const express = require('express');
const {
  createTeam,
  getAllTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
  updateTeamManagement,
  assignTeamLeader,
  assignTeamManager,
  assignTeamMember,
  removeTeamMember,
} = require('../controllers/teamsController');
const { requireAuth } = require('../middlewares/userMiddleware');
const router = express.Router();

// Team routes
router.post('/teams', requireAuth, createTeam); // Create a team
router.get('/teams', requireAuth, getAllTeams); // Get all teams
router.get('/teams/:team_id', requireAuth, getTeamById); // Get team by ID
router.put('/teams/:team_id', requireAuth, updateTeam); // Update team status
router.delete('/teams/:team_id', requireAuth, deleteTeam); // Soft-delete team

// Team management routes
router.put('/teams/:team_id/management', requireAuth, updateTeamManagement); // Bulk update leaders, manager, members
router.post('/teams/:team_id/leader', requireAuth, assignTeamLeader); // Assign a team leader
router.post('/teams/:team_id/manager', requireAuth, assignTeamManager); // Assign a team manager
router.post('/teams/:team_id/member', requireAuth, assignTeamMember); // Assign a team member
router.delete('/teams/:team_id/member/:team_member_id', requireAuth, removeTeamMember); // Remove a team member

module.exports = router;