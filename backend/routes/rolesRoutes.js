const express = require('express');
const { createRole, getAllRoles, getRoleById, updateRole, deleteRole } = require('../controllers/rolesController'); 
const router = express.Router();

router.post('/roles', createRole);
router.get('/roles', getAllRoles);
router.get('/roles/:id', getRoleById);
router.put('/roles/:id', updateRole);
router.delete('/roles/:id', deleteRole);

module.exports = router;
