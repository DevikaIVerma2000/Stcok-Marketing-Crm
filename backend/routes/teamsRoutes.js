const express = require('express');
const { createTeam , getAllTeams , getTeamById , updateTeam , deleteTeam , updateTeamManagement , manageTeamMember , assignRole } = require('../controllers/teamsController');
const { requireAuth } = require('../middlewares/userMiddleware');
const router = express.Router();

router.post('/teams', requireAuth, createTeam);
router.get('/teams', requireAuth, getAllTeams); 
router.get('/teams/:team_id', requireAuth, getTeamById); 
router.put('/teams/:team_id', requireAuth, updateTeam); 
router.delete('/teams/:team_id', requireAuth, deleteTeam); 

router.put('/teams/:team_id/management', requireAuth, updateTeamManagement); 
router.post('/teams/:team_id/member/:team_member_id', requireAuth, manageTeamMember);
router.post('/teams/:team_id/role', requireAuth, assignRole); 

module.exports = router;