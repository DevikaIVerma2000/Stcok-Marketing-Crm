const mongoose = require('mongoose');

const rolePermissionSchema = new mongoose.Schema({
    roleId: {
        type: mongoose.Schema.Types.Number,
        ref: 'RoleModel',
        required: true,
    },
    permissionId: {
        type: mongoose.Schema.Types.Number,
        ref: 'Permission',
        required: true,
    },
});

module.exports = mongoose.model('RolePermission', rolePermissionSchema);
