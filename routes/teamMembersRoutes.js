const express = require('express');
const {createTeamMember,getAllTeamMembers,getTeamMemberById,updateTeamMember,deleteTeamMember,} = require('../controllers/teamMembersController');
const router = express.Router();

router.post('/team-members', createTeamMember);
router.get('/team-members', getAllTeamMembers);
router.get('/team-members/:id', getTeamMemberById);
router.put('/team-members/:id', updateTeamMember);
router.delete('/team-members/:id', deleteTeamMember);

module.exports = router;
