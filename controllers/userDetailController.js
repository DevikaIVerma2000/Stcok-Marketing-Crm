const nodemailer = require('nodemailer');
const crypto = require('crypto');
const mongoose = require('mongoose'); 
const User = require('../models/userModel');  
const UserDetail = require('../models/userDetailModel');

const UserDetailController = {

  createUserDetail: async (req, res) => {
    try {
      const { firstName, lastName, username, email, phoneNo, address, designation, roleId, createdBy, senderEmail, senderPassword } = req.body;
  
      // Ensure the username is provided
      if (!username) {
        return res.status(400).json({ message: 'Username is required' });
      }
  
      // Validate the roleId
      if (!mongoose.Types.ObjectId.isValid(roleId)) {
        return res.status(400).json({ message: 'Invalid roleId' });
      }
  
      const roleObjectId = new mongoose.Types.ObjectId(roleId);
  
      // Generate a random password for the user
      const randomPassword = crypto.randomBytes(8).toString('hex');
  
      // Create the UserDetail document
      const userDetail = new UserDetail({
        firstName,
        lastName,
        username,  // Use the provided username
        email,
        phoneNo,
        address,
        designation,
        roleId: roleObjectId,
        createdBy
      });
  
      // Save the user detail to the database
      const savedUserDetail = await userDetail.save();
  
      // Create the user in the User collection (you can adapt it based on your needs)
      const user = new User({
        username,  // Use the provided username
        password: randomPassword  // Use the generated random password
      });
  
      // Save the user to the database
      await user.save();
  
      // Set up nodemailer to send an email with account details
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: senderEmail,  // Sender's email address
          pass: senderPassword  // Sender's email password
        }
      });
  
      // Create the email content
      const mailOptions = {
        from: senderEmail,
        to: email,
        subject: 'Your account details',
        text: `Hi ${firstName},\n\nYour account has been created successfully.\n\nUsername: ${username}\nPassword: ${randomPassword}\n\nPlease use these credentials to log in.\n\nBest regards,\nYour Company`
      };
  
      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Email sent: ' + info.response);
      });
  
      // Respond with success
      res.status(201).json({ message: 'User detail created successfully, email sent with credentials', data: savedUserDetail });
    } catch (error) {
      res.status(500).json({ message: 'Error creating user detail', error: error.message });
    }
  }
  ,

  getAllUserDetails: async (req, res) => {
    try {
      const userDetails = await UserDetail.find().populate('roleId');
      res.status(200).json({ message: 'User details fetched successfully', data: userDetails });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user details', error: error.message });
    }
  },

  getUserDetailById: async (req, res) => {
    try {
      const userDetail = await UserDetail.findById(req.params.id).populate('roleId');
      if (!userDetail) {
        return res.status(404).json({ message: 'User detail not found' });
      }
      res.status(200).json({ message: 'User detail fetched successfully', data: userDetail });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user detail', error: error.message });
    }
  },


  updateUserDetail: async (req, res) => {
    try {
      const updatedUserDetail = await UserDetail.findByIdAndUpdate(req.params.id, req.body, {
        new: true, 
        runValidators: true 
      });
      if (!updatedUserDetail) {
        return res.status(404).json({ message: 'User detail not found' });
      }
      res.status(200).json({ message: 'User detail updated successfully', data: updatedUserDetail });
    } catch (error) {
      res.status(500).json({ message: 'Error updating user detail', error: error.message });
    }
  },


  deleteUserDetail: async (req, res) => {
    try {
      const deletedUserDetail = await UserDetail.findByIdAndDelete(req.params.id);
      if (!deletedUserDetail) {
        return res.status(404).json({ message: 'User detail not found' });
      }
      res.status(200).json({ message: 'User detail deleted successfully', data: deletedUserDetail });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user detail', error: error.message });
    }
  }
};

module.exports = UserDetailController;