const mongoose = require('mongoose');
const UserAccessLogs = require('../models/userAccessLogsModel');

exports.logUserAccess = async (req, res) => {
  try {
    const { user_id, username, authentication_status } = req.body;

    
    const ip_address = '192.168.0.111';

   
    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({ error: "Invalid user_id format" });
    }

    const logEntry = new UserAccessLogs({
      user_id,
      username,
      ip_address,
      authentication_status,
    });

    await logEntry.save();

    res.status(201).json({
      success: true,
      message: 'User access log created successfully',
      data: logEntry,
    });
  } catch (error) {
    console.error('Error logging user access:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to log user access',
      error: error.message,
    });
  }
};
