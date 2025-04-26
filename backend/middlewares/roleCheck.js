const Role = require('../models/rolesModel');
const User = require('../models/userModel');
const UserAuth = require('../models/userAuthModel');

const roleCheck = (permission) => {
  return async (req, res, next) => {
    try {
      // Step 1: Get the authenticated user from req.user (set by requireAuth)
      const userAuthId = req.user.id;
      console.log('UserAuth ID:', userAuthId);

      // Step 2: Find the UserAuth document to get the linked user_id
      const userAuth = await UserAuth.findById(userAuthId).select('user_id');
      console.log('UserAuth:', userAuth);
      if (!userAuth) {
        return res.status(404).json({ success: false, message: 'UserAuth not found.' });
      }

      // Step 3: Find the User document to get the role_id
      const user = await User.findById(userAuth.user_id).select('role_id');
      console.log('User:', user);
      if (!user || !user.role_id) {
        return res.status(404).json({ success: false, message: 'User or role not found.' });
      }

      // Step 4: Find the Role document to check the specified permission
      const role = await Role.findById(user.role_id).select(permission);
      console.log('Role:', role);
      if (!role) {
        return res.status(404).json({ success: false, message: 'Role not found.' });
      }

      // Step 5: Check if the permission is granted (e.g., employee_view: 1)
      if (role[permission] !== 1) {
        return res.status(403).json({ success: false, message: `Access denied. ${permission} permission required.` });
      }

      // Step 6: Permission granted, proceed to the next middleware/controller
      next();
    } catch (err) {
      console.error('RoleCheck Error:', err);
      next(err);
    }
  };
};

module.exports = roleCheck;