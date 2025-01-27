const express = require('express');
const {
    createPermission,
    getAllPermissions,
    getPermissionById,
    updatePermission,
    deletePermission,
} = require('../controllers/permissionController');

const router = express.Router();

router.post('/', createPermission);

router.get('/', getAllPermissions);

router.get('/:permissionId', getPermissionById);

router.put('/:permissionId', updatePermission);

router.delete('/:permissionId', deletePermission);

module.exports = router;
