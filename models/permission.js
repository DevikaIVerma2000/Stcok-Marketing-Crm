const mongoose = require('mongoose');

// Define the Role Schema
const permissionSchema = new mongoose.Schema({
    permissionId: {
        type: Number,
        required: true,
        unique: true,  // Ensures unique roleId for each role
    },
    permissionName: {
        type: String,
        required: true,
        unique: true,  
    },
});

// Create the Role model using the roleSchema
const Permission = mongoose.model('permission', permissionSchema);

module.exports = Permission;
