const express = require('express');
const {
    createRolePermission,
    getAllRolePermissions,
    getRolePermissionById,
    updateRolePermission,
    deleteRolePermission,
} = require('../controllers/rolePermissionController');

const router = express.Router();

router.post('/', createRolePermission);

router.get('/', getAllRolePermissions);

router.get('/:id', getRolePermissionById);

router.put('/:id', updateRolePermission);

router.delete('/:id', deleteRolePermission);

module.exports = router;
