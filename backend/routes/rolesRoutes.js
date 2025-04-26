const express = require('express');
const { createRole, getAllRoles, getRoleById, updateRole, deleteRole } = require('../controllers/rolesController'); 
const router = express.Router();
const {requireAuth} = require('../middlewares/userMiddleware');

router.post('/roles', requireAuth,  createRole);
router.get('/roles', requireAuth,  getAllRoles);
router.get('/roles/:id', requireAuth,  getRoleById);
router.put('/roles/:id', requireAuth,  updateRole);
router.delete('/roles/:id', requireAuth, deleteRole);
module.exports = router;
