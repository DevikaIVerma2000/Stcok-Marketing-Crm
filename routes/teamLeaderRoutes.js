const express = require('express');
const { createTeamLeader,getAllTeamLeaders,getTeamLeaderById,updateTeamLeader,deleteTeamLeader,} = require('../controllers/teamLeaderController');
const router = express.Router();

router.post('/team-leaders', createTeamLeader);
router.get('/team-leaders', getAllTeamLeaders);
router.get('/team-leaders/:id', getTeamLeaderById);
router.put('/team-leaders/:id', updateTeamLeader);
router.delete('/team-leaders/:id', deleteTeamLeader);

module.exports = router;
