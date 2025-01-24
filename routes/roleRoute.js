const express = require('express');
const {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole,
} = require('../controllers/roleController');

const router = express.Router();

// POST: Create a new role
router.post('/', createRole);

// GET: Fetch all roles
router.get('/', getAllRoles);

// GET by ID: Fetch a specific role by roleId
router.get('/:roleId', getRoleById);

// PUT: Update a specific role by roleId
router.put('/:roleId', updateRole);

// DELETE: Delete a specific role by roleId
router.delete('/:roleId', deleteRole);

module.exports = router;
