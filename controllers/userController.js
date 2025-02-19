const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const UserAuth = require("../models/userAuthModel");

const UserDetailController = {
  createUserDetail: async (req, res) => {
    try {
      const {
        emp_id,
        firstName,
        lastName,
        full_name,
        email,
        primary_contact,
        phoneNo,
        address,
        designation,
        createdBy,
        senderEmail,
        senderPassword,
      } = req.body;

      if (!emp_id || !full_name || !primary_contact) {
        return res.status(400).json({
          message: "emp_id, full_name, and primary_contact are required",
        });
      }

      // Check if email already exists
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }

      // Check if primary_contact already exists
      const existingUser = await User.findOne({ primary_contact });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Primary contact already exists" });
      }

      // Check if emp_id (used as username) already exists in userAuth
      const existingUserAuth = await UserAuth.findOne({ username: emp_id });
      if (existingUserAuth) {
        return res
          .status(400)
          .json({ message: "Username (emp_id) already exists" });
      }

      const randomPassword = crypto.randomBytes(8).toString("hex");
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      const userDetail = new User({
        emp_id,
        first_name: firstName,
        last_name: lastName,
        full_name,
        email,
        primary_contact,
        phoneNo,
        address,
        designation,
        created_by: createdBy,
      });

      const savedUserDetail = await userDetail.save();

      const userAuthEntry = new UserAuth({
        user_id: savedUserDetail._id,
        username: emp_id,
        password: hashedPassword,
      });

      await userAuthEntry.save();

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: senderEmail,
          pass: senderPassword,
        },
      });

      const mailOptions = {
        from: senderEmail,
        to: email,
        subject: "Your account details",
        text: `Hi ${firstName},

Your account has been created successfully.

Username: ${emp_id}
Password: ${randomPassword}

Please use these credentials to log in.

Best regards,
Your Company`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Email sending failed:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });

      res.status(201).json({
        message:
          "User detail created successfully, email sent with credentials",
        data: savedUserDetail,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating user detail", error: error.message });
    }
  },

  getAllUserDetails: async (req, res) => {
    try {
      const userDetails = await User.find();
      res.status(200).json({
        message: "User details fetched successfully",
        data: userDetails,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching user details", error: error.message });
    }
  },

  getUserDetailById: async (req, res) => {
    try {
      const userDetail = await User.findById(req.params.id);
      if (!userDetail) {
        return res.status(404).json({ message: "User detail not found" });
      }
      res.status(200).json({
        message: "User detail fetched successfully",
        data: userDetail,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching user detail", error: error.message });
    }
  },

  updateUserDetail: async (req, res) => {
    try {
      const updatedUserDetail = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
      if (!updatedUserDetail) {
        return res.status(404).json({ message: "User detail not found" });
      }
      res.status(200).json({
        message: "User detail updated successfully",
        data: updatedUserDetail,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating user detail", error: error.message });
    }
  },

  deleteUserDetail: async (req, res) => {
    try {
      const deletedUserDetail = await User.findByIdAndDelete(req.params.id);
      if (!deletedUserDetail) {
        return res.status(404).json({ message: "User detail not found" });
      }
      res.status(200).json({
        message: "User detail deleted successfully",
        data: deletedUserDetail,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting user detail", error: error.message });
    }
  },
};

module.exports = UserDetailController;
