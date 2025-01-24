const express = require('express');
const {
    createPermission,
    getAllPermissions,
    getPermissionById,
    updatePermission,
    deletePermission,
} = require('../controllers/permissionController');

const router = express.Router();

// POST: Create a new permission
router.post('/', createPermission);

// GET: Fetch all permissions
router.get('/', getAllPermissions);

// GET by ID: Fetch a specific permission by permissionId
router.get('/:permissionId', getPermissionById);

// PUT: Update a specific permission by permissionId
router.put('/:permissionId', updatePermission);

// DELETE: Delete a specific permission by permissionId
router.delete('/:permissionId', deletePermission);

module.exports = router;
