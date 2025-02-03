const express = require('express');
const {createTeam,getAllTeams,getTeamById,updateTeam,deleteTeam,} = require('../controllers/teamsController');
const router = express.Router();

router.post('/teams', createTeam);
router.get('/teams', getAllTeams);
router.get('/teams/:id', getTeamById);
router.put('/teams/:id', updateTeam);
router.delete('/teams/:id', deleteTeam);

module.exports = router;
