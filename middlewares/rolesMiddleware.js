const Role = require('../models/rolesModel');

const checkPermission = (permissionField) => {
  return async (req, res, next) => {
    try {
      const role = await Role.findOne({ id: req.user.roleId });
      if (!role) {
        return res.status(403).json({ message: 'Role not found' });
      }

      if (role[permissionField] === 1) {
        next();
      } else {
        return res.status(403).json({ message: 'Access denied' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Permission check failed', error });
    }
  };
};

module.exports = {
  checkPermission
};
