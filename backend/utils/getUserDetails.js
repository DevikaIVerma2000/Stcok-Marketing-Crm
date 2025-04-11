const User = require("../models/userModel");
const Role = require("../models/rolesModel");
const UserAuth = require("../models/userAuthModel");
const Department = require("../models/departmentsModel");
const Designation = require("../models/designationsModel");
const UserBranch = require("../models/branchesModel");
const Shift = require("../models/shiftsModel");
const EmploymentDetails = require("../models/employmentDetailsModel");
const Attendance = require("../models/attendancesModel"); 


const getUserDetailsUtil = async ({ page = 1, limit = 10, search = '', status = 'active' }) => {
  // Build query
  const query = { deleted_at: null };

  if (search) {
    query.$or = [
      { full_name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { emp_id: { $regex: search, $options: 'i' } },
    ];
  }

  if (status === 'active') {
    query.user_status = 'Active';
  } else if (status === 'former') {
    query.user_status = 'Inactive';
  }

  const users = await User.find(query)
    .select('emp_id full_name')
    .skip((page - 1) * limit)
    .limit(limit);

  const userDetails = await Promise.all(
    users.map(async (user) => {
      const auth = await UserAuth.findOne({ user_id: user._id }).select('username');
      const employment = await EmploymentDetails.findOne({ user_id: user._id })
        .populate('role_id', 'role_name')
        .populate('designation_id', 'designation_name')
        .populate('department_id', 'department_name')
        .select('role_id designation_id department_id');

      return {
        emp_id: user.emp_id,
        full_name: user.full_name,
        username: auth?.username || null,
        role: employment?.role_id?.role_name || null,
        designation: employment?.designation_id?.designation_name || null,
        department: employment?.department_id?.department_name || null,
      };
    })
  );

  const total = await User.countDocuments(query);
  const totalPages = Math.ceil(total / limit);

  return {
    userDetails,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems: total,
      itemsPerPage: limit,
    },
    links: {
      self: `/api/user-details?page=${page}&limit=${limit}${search ? `&search=${search}` : ''}${status ? `&status=${status}` : ''}`,
      next: page < totalPages ? `/api/user-details?page=${page + 1}&limit=${limit}${search ? `&search=${search}` : ''}${status ? `&status=${status}` : ''}` : null,
      prev: page > 1 ? `/api/user-details?page=${page - 1}&limit=${limit}${search ? `&search=${search}` : ''}${status ? `&status=${status}` : ''}` : null,
    }
  };
};

module.exports = getUserDetailsUtil;
