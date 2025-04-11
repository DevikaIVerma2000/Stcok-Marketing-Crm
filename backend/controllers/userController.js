const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
require("dotenv").config();

// Models import
const User = require("../models/userModel");
const Role = require("../models/rolesModel");
const UserAuth = require("../models/userAuthModel");
const Department = require("../models/departmentsModel");
const Designation = require("../models/designationsModel");
const UserBranch = require("../models/branchesModel");
const Shift = require("../models/shiftsModel");
const EmploymentDetails = require("../models/employmentDetailsModel");
const Attendance = require("../models/attendancesModel");
const getUserDetailsUtil = require("../utils/getUserDetails");

// Helper to validate required fields
const validateRequiredFields = (fields, data) => {
  const missing = fields.filter((field) => !data[field]);
  if (missing.length > 0) {
    throw new Error(`Missing required fields: ${missing.join(", ")}`);
  }
};

const getAllUserDetails = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const status = req.query.status || "active";

    const result = await getUserDetailsUtil({ page, limit, search, status });

    const responseData = {
      userDetails: result.userDetails,
      pagination: result.pagination,
      links: result.links,
    };
    res.status(200).json(responseData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserDetailById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(id).populate("branch_id", "branch_name branch_emp_code");
    const auth = await UserAuth.findOne({ user_id: id });
    const employment = await EmploymentDetails.findOne({ user_id: id })
      .populate("role_id", "role_name")
      .populate("department_id", "department_name")
      .populate("designation_id", "designation_name");
    const attendance = await Attendance.findOne({ user_id: id })
      .populate("shift_id", "shift_name");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const responseData = {
      user,
      auth,
      employment,
      attendance
    };

    res.status(200).json(responseData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createUserDetail = async (req, res) => {
  try {
    const {
      full_name,
      email,
      primary_contact,
      username,
      password,
      loginStatus,
      roleId,
      departmentId,
      designationId,
      monthlyCTC,
      dateOfJoining,
      shiftId,
      userBranchId,
    } = req.body;

    // Required fields validation for User
    validateRequiredFields(
      ["full_name", "email", "primary_contact", "userBranchId", "shiftId", "monthlyCTC", "dateOfJoining"],
      req.body
    );

    // Validate ObjectId format
    const invalidIds = [
      { key: "roleId", value: roleId },
      { key: "departmentId", value: departmentId },
      { key: "designationId", value: designationId },
      { key: "userBranchId", value: userBranchId },
      { key: "shiftId", value: shiftId },
    ].filter(({ value }) => value && !mongoose.Types.ObjectId.isValid(value));

    if (invalidIds.length > 0) {
      return res.status(400).json({ message: `Invalid ObjectId(s): ${invalidIds.map((id) => id.key).join(", ")}` });
    }

    // Foreign key validations
    const [role, department, designation, branch, shift] = await Promise.all([
      Role.findById(roleId),
      Department.findById(departmentId),
      Designation.findById(designationId),
      UserBranch.findById(userBranchId),
      Shift.findById(shiftId),
    ]);

    if (!role || !department || !designation || !branch || !shift) {
      return res.status(400).json({ message: "One or more referenced IDs not found" });
    }

    // Validate loginStatus
    if (loginStatus && !["Active", "disable"].includes(loginStatus)) {
      return res.status(400).json({ message: "loginStatus must be 'Active' or 'disable'" });
    }

    // Duplicate checks
    const [existingEmail, existingPhone, existingUsername] = await Promise.all([
      User.findOne({ email }),
      User.findOne({ primary_contact }),
      UserAuth.findOne({ username }),
    ]);

    if (existingEmail) return res.status(409).json({ message: "Email already exists" });
    if (existingPhone) return res.status(409).json({ message: "Primary contact already exists" });
    if (existingUsername) return res.status(409).json({ message: "Username already exists" });

    // Generate emp_id with branch prefix
    const branchPrefix = branch.branch_emp_code || "EMP";
    const lastUser = await User.findOne({ branch_id: userBranchId }).sort({ createdAt: -1 });
    let nextId = 1;

    if (lastUser?.emp_id) {
      const match = lastUser.emp_id.match(/(\d+)$/);
      if (match) nextId = parseInt(match[0], 10) + 1;
    }

    const emp_id = `${branchPrefix}_${String(nextId).padStart(4, "0")}`;

    // Hash password
    const hashedPassword = await bcrypt.hash(password || "defaultPassword", 10);

    // Create User (Basic Information)
    const newUser = new User({
      emp_id,
      first_name: null,
      middle_name: null,
      last_name: null,
      full_name,
      email,
      primary_contact,
      secondary_contact: null,
      emergency_contact_name: null,
      emergency_contact_relation: null,
      emergency_contact: null,
      date_of_birth: null,
      address: null,
      city: null,
      state: null,
      pincode: null,
      country: null,
      alt_address: null,
      alt_city: null,
      alt_state: null,
      alt_pincode: null,
      gender: null,
      marital_status: null,
      bank_name: null,
      bank_ifsc_code: null,
      bank_account_number: null,
      bank_proof_url: null,
      pan_number: null,
      pan_proof_url: null,
      aadhaar_card: null,
      aadhaar_proof_url: null,
      blood_group: null,
      photo_url: null,
      branch_id: userBranchId,
      monthly_target: 0,
      user_status: loginStatus || "Active",
      created_by: null,
      updated_by: null,
      deleted_at: null,
    });
    const savedUser = await newUser.save();

    // Create UserAuth -> Login Information
    const userAuthEntry = new UserAuth({
      user_id: savedUser._id,
      username,
      password: hashedPassword,
    });
    await userAuthEntry.save();

    // Create EmploymentDetails
    const employmentDetail = new EmploymentDetails({
      user_id: savedUser._id,
      role_id: roleId,
      department_id: departmentId,
      designation_id: designationId,
      ctc_salary: monthlyCTC,
      start_date: dateOfJoining,
      created_by: savedUser._id,
    });
    await employmentDetail.save();

    // Create Attendance
    const attendanceEntry = new Attendance({
      user_id: savedUser._id,
      shift_id: shiftId,
      attendance_legend_code: "P",
      date: new Date(),
      paid_no_of_days: 0,
      ip_address: req.ip || "0.0.0.0",
    });
    await attendanceEntry.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your Account Details",
        text: `Hi ${full_name},\n\nYour account has been created successfully.\n\nUsername: ${username}\nPassword: ${password || '[Your chosen password]'}\n\nBest regards,\nYour Company`,
      };

      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error("Email sending failed:", emailError.message);
    }

    const responseData = {
      user: savedUser,
      auth: userAuthEntry,
      employment: employmentDetail,
      attendance: attendanceEntry,
    };

    res.status(201).json(responseData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateUserDetail = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const updates = req.body;
    delete updates.emp_id;
    delete updates.createdAt;

    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update related tables if needed
    if (updates.username || updates.password) {
      const authUpdate = {};
      if (updates.username) authUpdate.username = updates.username;
      if (updates.password) authUpdate.password = await bcrypt.hash(updates.password, 10);
      await UserAuth.findOneAndUpdate({ user_id: id }, authUpdate, { new: true });
    }

    if (updates.roleId || updates.departmentId || updates.designationId || updates.monthlyCTC || updates.dateOfJoining) {
      await EmploymentDetails.findOneAndUpdate(
        { user_id: id },
        {
          role_id: updates.roleId,
          department_id: updates.departmentId,
          designation_id: updates.designationId,
          ctc_salary: updates.monthlyCTC,
          start_date: updates.dateOfJoining,
          updated_at: new Date(),
        },
        { new: true }
      );
    }

    if (updates.shiftId) {
      await Attendance.findOneAndUpdate(
        { user_id: id },
        { shift_id: updates.shiftId, updated_at: new Date() },
        { new: true, upsert: true }
      );
    }
    const responseData = updatedUser;
    res.status(200).json(responseData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteUserDetail = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const deletedUser = await User.findByIdAndDelete(id).session(session);
      if (!deletedUser) throw new Error("User not found");

      await UserAuth.deleteOne({ user_id: id }).session(session);
      await EmploymentDetails.deleteOne({ user_id: id }).session(session);
      await Attendance.deleteOne({ user_id: id }).session(session);

      await session.commitTransaction();
      res.status(200).json({ message: "User deleted successfully", data: deletedUser });
    } catch (error) {
      await session.abortTransaction();
      res.status(500).json({ error: error.message || "Error deleting user" });
    } finally {
      session.endSession();
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getUserDetailByEmpId = async (req, res) => {
  try {
    const { emp_id } = req.params;
    if (!emp_id) {
      return res.status(400).json({ message: "emp_id is required" });
    }

    const user = await User.findOne({ emp_id }).populate("branch_id", "branch_name branch_emp_code");
    if (!user) {
      return res.status(404).json({ message: `User with emp_id ${emp_id} not found` });
    }

    const auth = await UserAuth.findOne({ user_id: user._id });
    const employment = await EmploymentDetails.findOne({ user_id: user._id })
      .populate("role_id", "role_name")
      .populate("department_id", "department_name")
      .populate("designation_id", "designation_name");
    const attendance = await Attendance.findOne({ user_id: user._id })
      .populate("shift_id", "shift_name");

    const responseData = {
      user,
      auth,
      employment,
      attendance
    };
    res.status(200).json(responseData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUserDetailByEmpId = async (req, res) => {
  try {
    const { emp_id } = req.params;
    const updates = req.body;

    if (!emp_id) {
      return res.status(400).json({ message: "emp_id is required" });
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No updates provided" });
    }

    const user = await User.findOne({ emp_id });
    if (!user) {
      return res.status(404).json({ message: `User with emp_id ${emp_id} not found` });
    }

    delete updates.emp_id;
    delete updates._id;
    delete updates.createdAt;

    const userUpdates = {
      first_name: updates.first_name,
      middle_name: updates.middle_name,
      last_name: updates.last_name,
      full_name: updates.full_name,
      email: updates.email,
      primary_contact: updates.primary_contact,
      secondary_contact: updates.secondary_contact,
      date_of_birth: updates.date_of_birth,
      gender: updates.gender,
      marital_status: updates.marital_status,
      blood_group: updates.blood_group,
      branch_id: updates.branch_id,
      user_status: updates.user_status,
      address: updates.address,
      city: updates.city,
      state: updates.state,
      pincode: updates.pincode,
      country: updates.country,
      alt_address: updates.alt_address,
      alt_city: updates.alt_city,
      alt_state: updates.alt_state,
      alt_pincode: updates.pincode,
      emergency_contact_name: updates.emergency_contact_name,
      emergency_contact_relation: updates.emergency_contact_relation,
      emergency_contact: updates.emergency_contact,
      bank_name: updates.bank_name,
      bank_ifsc_code: updates.bank_ifsc_code,
      bank_account_number: updates.bank_account_number,
      bank_proof_url: updates.bank_proof_url,
      pan_number: updates.pan_number,
      pan_proof_url: updates.pan_proof_url,
      aadhaar_card: updates.aadhaar_card,
      aadhaar_proof_url: updates.aadhaar_proof_url,
      updatedAt: new Date(),
    };

    Object.keys(userUpdates).forEach(
      (key) => updates[key] === undefined && delete userUpdates[key]
    );

    const updatedUser = await User.findOneAndUpdate(
      { emp_id },
      userUpdates,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found during update" });
    }

    if (updates.username || updates.password) {
      const authUpdate = {};
      if (updates.username) authUpdate.username = updates.username;
      if (updates.password) authUpdate.password = await bcrypt.hash(updates.password, 10);
      await UserAuth.findOneAndUpdate(
        { user_id: user._id },
        { ...authUpdate, updatedAt: new Date() },
        { new: true }
      );
    }

    if (updates.roleId || updates.departmentId || updates.designationId || updates.monthlyCTC || updates.dateOfJoining) {
      await EmploymentDetails.findOneAndUpdate(
        { user_id: user._id },
        {
          role_id: updates.roleId,
          department_id: updates.departmentId,
          designation_id: updates.designationId,
          ctc_salary: updates.monthlyCTC,
          start_date: updates.dateOfJoining,
          updated_at: new Date(),
        },
        { new: true }
      );
    }

    if (updates.shiftId) {
      await Attendance.findOneAndUpdate(
        { user_id: user._id },
        { shift_id: updates.shiftId, updated_at: new Date() },
        { new: true, upsert: true }
      );
    }

    // Fetch updated details to return
    const auth = await UserAuth.findOne({ user_id: user._id });
    const employment = await EmploymentDetails.findOne({ user_id: user._id })
      .populate("role_id", "role_name")
      .populate("department_id", "department_name")
      .populate("designation_id", "designation_name");
    const attendance = await Attendance.findOne({ user_id: user._id })
      .populate("shift_id", "shift_name");

    const responseData = {
      user: updatedUser,
      auth,
      employment,
      attendance
    };

    res.status(200).json({ message: "User updated successfully", data: responseData });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateEmployeeDetailByEmpId = async (req, res) => {
  try {
    const { emp_id } = req.params;
    const {
      roleId,
      departmentId,
      designationId,
      ctc_salary,
      employmentStatus,
      CrmLoginStatus,
      employment_status_description,
      employment_reason_for_change,
      start_date,
    } = req.body;

    if (!emp_id) {
      return res.status(400).json({ message: "emp_id is required" });
    }

    const user = await User.findOne({ emp_id });
    if (!user) {
      return res.status(404).json({ message: `User with emp_id ${emp_id} not found` });
    }

    // Validate ObjectIds for role, department, and designation
    const idsToValidate = { roleId, departmentId, designationId };
    const invalidIds = Object.entries(idsToValidate)
      .filter(([_, value]) => value && !mongoose.Types.ObjectId.isValid(value))
      .map(([key]) => key);
    if (invalidIds.length > 0) {
      return res.status(400).json({ message: `Invalid ObjectId(s): ${invalidIds.join(", ")}` });
    }

    // Fetch existing employment details
    const existingEmployment = await EmploymentDetails.findOne({ user_id: user._id });
    if (!existingEmployment && !roleId && !departmentId && !designationId && !ctc_salary && !employmentStatus && !employment_status_description && !employment_reason_for_change && !start_date) {
      return res.status(404).json({ message: "No employment details found to update and no new data provided" });
    }

    // Case-insensitive validation for CrmLoginStatus
    const validCrmLoginStatuses = ["Active", "Disable", "Diable"];
    const normalizedCrmLoginStatus = CrmLoginStatus ? CrmLoginStatus.toLowerCase() : null;
    if (CrmLoginStatus && !validCrmLoginStatuses.some(status => status.toLowerCase() === normalizedCrmLoginStatus)) {
      return res.status(400).json({ message: "CrmLoginStatus must be 'Active', 'Disable', or 'Diable'" });
    }

    // Logic for CRM Login, Employment Status, and User Status
    let finalEmploymentStatus = employmentStatus || existingEmployment?.employment_status || "Active";
    let finalUserStatus = user.user_status || "Active";
    let finalCrmLoginStatus = CrmLoginStatus || (existingEmployment?.employment_status === "Former Employee" ? "Disable" : "Active");

    let userAuthUpdate = {};
    if (normalizedCrmLoginStatus === "disable" || normalizedCrmLoginStatus === "diable") {
      finalUserStatus = "disable";
      finalCrmLoginStatus = "disable";
      userAuthUpdate = {
        emp_access_status: "disable",
        login_status: false,
        updated_at: new Date()
      };
    } else if (normalizedCrmLoginStatus === "active") {
      finalUserStatus = "Active";
      finalCrmLoginStatus = "active";
      userAuthUpdate = {
        emp_access_status: "active",
        login_status: true,
        updated_at: new Date()
      };
    }

    const existingAuth = await UserAuth.findOne({ user_id: user._id });
    if (existingAuth && existingAuth.emp_access_status === "inactive" && (normalizedCrmLoginStatus === "disable" || normalizedCrmLoginStatus === "diable")) {
      userAuthUpdate.emp_access_status = "disable";
    }

    const updatedAuth = await UserAuth.findOneAndUpdate(
      { user_id: user._id },
      userAuthUpdate,
      { new: true, upsert: true, runValidators: true }
    );
    if (!updatedAuth && Object.keys(userAuthUpdate).length > 0) {
      return res.status(500).json({ message: "Failed to update UserAuth" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { emp_id },
      { user_status: finalUserStatus, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(500).json({ message: "Failed to update User" });
    }

    // Get the updater's name from req.user (assuming authentication middleware)
    const updater = await User.findById(req.user?._id || user._id); 
    const updaterName = updater ? updater.full_name || "Unknown" : "Unknown";

    const updates = {
      role_id: roleId || existingEmployment?.role_id,
      department_id: departmentId || existingEmployment?.department_id,
      designation_id: designationId || existingEmployment?.designation_id,
      ctc_salary: ctc_salary !== undefined ? ctc_salary : existingEmployment?.ctc_salary, 
      employment_status: finalEmploymentStatus,
      employment_status_description: employment_status_description || existingEmployment?.employment_status_description,
      employment_reason_for_change: employment_reason_for_change || existingEmployment?.employment_reason_for_change || "Updated",
      start_date: start_date ? new Date(start_date) : existingEmployment?.start_date || new Date(),
      updated_at: new Date(),
      updated_by: req.user?._id || user._id, 
    };

    const updatedEmployment = await EmploymentDetails.findOneAndUpdate(
      { user_id: user._id },
      updates,
      { new: true, upsert: true, runValidators: true }
    )
      .populate("role_id", "role_name")
      .populate("department_id", "department_name")
      .populate("designation_id", "designation_name");

    res.status(200).json({
      message: "Employment details updated successfully",
      data: {
        user: updatedUser,
        auth: updatedAuth,
        employment: updatedEmployment,
        updatedBy: updaterName 
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// getUsersByStatus function

const getUsersByStatus = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const status = req.query.status?.toLowerCase();

    let statusFilter = {};
    if (status === "active") {
      statusFilter = { user_status: "Active" };
    } else if (status === "former") {
      statusFilter = { user_status: "disable" };
    }

    const query = {
      ...statusFilter,
      deleted_at: null,
    };

    const skip = (page - 1) * limit;

    // Enhanced search with multiple fields
    const searchQuery = search
      ? {
          $or: [
            { full_name: { $regex: search, $options: "i" } },
            { emp_id: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    // Fetch users with related data and enhanced search
    const users = await User.aggregate([
      { $match: { ...query, ...searchQuery } },
      {
        $lookup: {
          from: "userauths",
          localField: "_id",
          foreignField: "user_id",
          as: "auth",
        },
      },
      { $unwind: { path: "$auth", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "employmentdetails",
          localField: "_id",
          foreignField: "user_id",
          as: "employment",
        },
      },
      { $unwind: { path: "$employment", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "roles",
          localField: "employment.role_id",
          foreignField: "_id",
          as: "employment.role",
        },
      },
      { $unwind: { path: "$employment.role", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "departments",
          localField: "employment.department_id",
          foreignField: "_id",
          as: "employment.department",
        },
      },
      { $unwind: { path: "$employment.department", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "designations",
          localField: "employment.designation_id",
          foreignField: "_id",
          as: "employment.designation",
        },
      },
      { $unwind: { path: "$employment.designation", preserveNullAndEmptyArrays: true } },

      ...((search && search.trim().length > 0)
        ? [
            {
              $match: {
                $or: [
                  { "auth.username": { $regex: search, $options: "i" } },
                  { "employment.role.role_name": { $regex: search, $options: "i" } },
                  { "employment.designation.designation_name": { $regex: search, $options: "i" } },
                  { "employment.department.department_name": { $regex: search, $options: "i" } },
                ],
              },
            },
          ]
        : []),
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          emp_id: 1,
          full_name: 1,
          username: "$auth.username",
          role: "$employment.role.role_name",
          designation: "$employment.designation.designation_name",
          department: "$employment.department.department_name",
          user_status: 1,
        },
      },
    ]);

    // Count total active and disabled users
    const activeCount = await User.countDocuments({ user_status: "Active", deleted_at: null });
    const disabledCount = await User.countDocuments({ user_status: "disable", deleted_at: null });
    const total = await User.countDocuments({ ...query, ...searchQuery });
    const totalPages = Math.ceil(total / limit);

    let message = "Showing all employees";
    if (status === "active") {
      message = "Showing active employees";
    } else if (status === "former") {
      message = "Showing former employees";
    } else if (users.length > 0) {
      message = `Showing ${users[0].user_status === "Active" ? "active" : "former"} employees`;
    }

    const responseData = {
      message: message,
      users: users.map((user) => ({
        emp_id: user.emp_id || "",
        full_name: user.full_name || "",
        username: user.username || "",
        role: user.role || "",
        designation: user.designation || "",
        department: user.department || "",
        user_status: user.user_status || "",
      })),
      statusSummary: {
        activeUsers: activeCount,
        disabledUsers: disabledCount,
      },
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
        itemsPerPage: limit,
      },
      links: {
        next: page < totalPages ? `/api/users/status?page=${page + 1}&limit=${limit}&search=${search}&status=${status || ""}` : null,
        prev: page > 1 ? `/api/users/status?page=${page - 1}&limit=${limit}&search=${search}&status=${status || ""}` : null,
      },
    };

    res.status(200).json(responseData);
  } catch (err) {
    console.error("Error in getUsersByStatus:", err);
    res.status(500).json({ error: err.message });
  }
};
module.exports = {
  getAllUserDetails,
  getUserDetailById,
  createUserDetail,
  updateUserDetail,
  deleteUserDetail,
  getUserDetailByEmpId,
  updateUserDetailByEmpId,
  updateEmployeeDetailByEmpId,
  getUsersByStatus
};
