const express = require('express');
const {
    createRolePermission,
    getAllRolePermissions,
    getRolePermissionById,
    updateRolePermission,
    deleteRolePermission,
} = require('../controllers/rolePermissionController');

const router = express.Router();

// POST: Create a new role-permission mapping
router.post('/', createRolePermission);

// GET: Fetch all role-permission mappings
router.get('/', getAllRolePermissions);

// GET by ID: Fetch a specific mapping
router.get('/:id', getRolePermissionById);

// PUT: Update a specific mapping
router.put('/:id', updateRolePermission);

// DELETE: Delete a specific mapping
router.delete('/:id', deleteRolePermission);

module.exports = router;
