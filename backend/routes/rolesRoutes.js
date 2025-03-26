const express = require('express');
const { createRole, getAllRoles, getRoleById, updateRole, deleteRole } = require('../controllers/rolesController'); 
const router = express.Router();
const { checkPermission } = require('../middlewares/rolesMiddleware');
const {requireAuth} = require('../middlewares/userMiddleware')

router.post('/roles', requireAuth, checkPermission('role_create'), createRole);
router.get('/roles', requireAuth, checkPermission('role_view'), getAllRoles);
router.get('/roles/:id', requireAuth, checkPermission('role_view'), getRoleById);
router.put('/roles/:id', requireAuth, checkPermission('role_update'), updateRole);
router.delete('/roles/:id', requireAuth, checkPermission('role_delete'), deleteRole);
module.exports = router;
