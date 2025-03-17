const Role = require('../models/rolesModel');

const checkPermission = (permissionField) => {
  return async (req, res, next) => {
    try {
      const role = await Role.findOne({ _id: req.user.roleId });  

      if (!role) {
        return res.status(403).json({ success: false, message: 'Role not found' });
      }

      if (role[permissionField] && role[permissionField] === 1) {
        return next();
      }

      return res.status(403).json({ success: false, message: 'Access denied' });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Permission check failed', error: error.message });
    }
  };
};

module.exports = {
  checkPermission
};
