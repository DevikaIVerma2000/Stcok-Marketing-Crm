const express = require('express');
const {createRole, getAllRoles,getRoleById,updateRole,deleteRole } = require('../controllers/rolesController');
const rolesMiddleware = require('../middlewares/rolesMiddleware');

const router = express.Router();

router.post('/roles', rolesMiddleware, createRole);
router.get('/roles', rolesMiddleware, getAllRoles);
router.get('/roles/:id', rolesMiddleware, getRoleById);
router.put('/roles/:id', rolesMiddleware, updateRole);
router.delete('/roles/:id', rolesMiddleware, deleteRole);

module.exports = router;
