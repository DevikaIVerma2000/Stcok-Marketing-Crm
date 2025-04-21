const Customer = require("../models/customerModel");
const CallStatuses = require("../models/callStatusesModel");
const CallHistory = require("../models/callHistoryModel");
const { getIndiaTime } = require("../utils/time");
const mongoose = require("mongoose");


// Create a new customer
const createCustomer = async (req, res) => {
  try {
    const {
      suffix,
      first_name,
      middle_name,
      last_name,
      full_name,
      company_name,
      primary_contact,
      secondary_contact,
      email_id,
      date_of_birth,
      address,
      city,
      state,
      zipcode,
      country,
      pancard,
      pan_proof_url,
      aadhaar_card,
      aadhaar_proof_url,
      kyc_status,
      compliance_status,
      gst_number,
      gst_number_url,
      welcome_email_status,
      dnc,
      created_by,
    } = req.body;

    if (!first_name || !last_name || !full_name || !primary_contact || !email_id || !created_by) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: first_name, last_name, full_name, primary_contact, email_id, created_by",
      });
    }

    const customer = new Customer({
      suffix: suffix || undefined,
      first_name,
      middle_name: middle_name || undefined,
      last_name,
      full_name,
      company_name: company_name || undefined,
      primary_contact,
      secondary_contact: secondary_contact || undefined,
      email_id,
      date_of_birth: date_of_birth || undefined,
      address: address || undefined,
      city: city || undefined,
      state: state || undefined,
      zipcode: zipcode || undefined,
      country: country || "INDIA",
      pancard: pancard || undefined,
      pan_proof_url: pan_proof_url || undefined,
      aadhaar_card: aadhaar_card || undefined,
      aadhaar_proof_url: aadhaar_proof_url || undefined,
      kyc_status: kyc_status === "on" ? 1 : 0,
      compliance_status: compliance_status === "on" ? 1 : 0,
      gst_number: gst_number || undefined,
      gst_number_url: gst_number_url || undefined,
      welcome_email_status: welcome_email_status === "on" ? 1 : 0,
      dnc: dnc === "on" ? 1 : 0,
      created_by,
    });

    await customer.save();

    return res.status(201).json({
      success: true,
      message: "Customer created successfully",
      data: {
        id: customer._id,
        ...customer._doc,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create customer",
      error: error.message,
    });
  }
};

// Get all customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();

    if (!customers.length) {
      return res.status(404).json({
        success: false,
        message: "No customers found",
      });
    }

    const data = await Promise.all(
      customers.map(async (customer) => {
        const callHistory = await CallHistory.findOne({ customer_id: customer._id }).sort({ updatedAt: -1 });
        let callStatusRecord = null;
        if (callHistory && callHistory.call_status_id) {
          callStatusRecord = await CallStatuses.findOne({ _id: callHistory.call_status_id });
        }
        const followUpDate = callHistory?.follow_up_date
          ? getIndiaTime(callHistory.follow_up_date) 
          : null;

        return {
          id: customer._id,
          follow_up_date: followUpDate,
          date: getIndiaTime(customer.created_at).split(" ")[0],
          full_name: customer.full_name,
          primary_contact: customer.primary_contact,
          callStatus: callStatusRecord ? callStatusRecord.call_status_name : (customer.callStatus || "Not Called"),
          follow_up: callStatusRecord ? callStatusRecord.follow_up : (customer.follow_up || "No"),
          package_name: customer.package_name || "No Package Enrolled",
          package_expire: customer.package_expire || "NA",
          status: customer.status || "Active",
          action: "View",
        };
      })
    );

    return res.status(200).json({
      success: true,
      message: "Get all customers",
      total: customers.length,
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve customers",
      error: error.message,
    });
  }
};

// Get customer by ID
const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find customer by ID
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    // Get latest call history for follow-up date
    const callHistory = await CallHistory.findOne({ customer_id: id }).sort({ updatedAt: -1 });
    const followUpDate = callHistory?.follow_up_date
      ? getIndiaTime(callHistory.follow_up_date) 
      : null;

    // Find the call status from call_statuses table using call_status_id from call history
    let callStatusRecord = null;
    if (callHistory && callHistory.call_status_id) {
      // Assuming call_status_id might be an integer due to the auto-incremented id in the callstatuses table
      callStatusRecord = await CallStatuses.findOne({ _id: callHistory.call_status_id });
      if (!callStatusRecord) {
        // Fallback to case-insensitive name search if ID lookup fails
        const callStatusValue = customer.callStatus ? customer.callStatus.trim() : "";
        callStatusRecord = await CallStatuses.findOne({
          call_status_name: { $regex: new RegExp(`^${callStatusValue}$`, 'i') }
        });
      }
    }
   
    // Prepare formatted customer object
    const formattedCustomer = {
      id: customer._id,
      follow_up_date: followUpDate,
      date: getIndiaTime(customer.created_at).split(" ")[0],
      full_name: customer.full_name,
      primary_contact: customer.primary_contact,
      callStatus: callStatusRecord ? callStatusRecord.call_status_name : (customer.callStatus || "Not Called"),
      follow_up: callStatusRecord ? callStatusRecord.follow_up : (customer.follow_up || "No"),
      package_name: customer.package_name || "No Package Enrolled",
      package_expire: customer.package_expire || "NA",
      status: customer.status || "Active",
      action: "View",
    };

    return res.status(200).json({
      success: true,
      message: "Customer retrieved successfully",
      data: formattedCustomer,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve customer",
      error: error.message,
    });
  }
};

// Update customer
const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params; 
    const { customerStatus, comments, callbackTime, user_id, recording_url } = req.body;

    // Validation
    if (!id || !customerStatus) {
      return res.status(400).json({
        success: false,
        message: "Customer ID and status are required",
      });
    }

    
    const customerId = new mongoose.Types.ObjectId(id);

    // Find the call status from call_statuses table
    const callStatusRecord = await CallStatuses.findOne({
      call_status_name: { $regex: new RegExp(`^${customerStatus}$`, 'i') },
    });

    if (!callStatusRecord) {
      return res.status(400).json({
        success: false,
        message: `Invalid call status: "${customerStatus}" not found in call_statuses`,
      });
    }

    // Update customer status
    const originalCustomer = await Customer.findById(customerId);
    if (!originalCustomer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    // Get user_id from request or use a fallback for testing
     let userId = user_id ? new mongoose.Types.ObjectId(user_id) : req.user?._id;
    

    // Update call history 
    const callHistoryUpdate = {
      customer_id: customerId,
      call_status_id: callStatusRecord._id,
      user_id: userId,
      notes: comments || null,
      recording_url: recording_url || null,
      follow_up_date: callbackTime ? new Date(callbackTime) : null,
    };

    const callHistory = await CallHistory.findOneAndUpdate(
      { customer_id: customerId },
      callHistoryUpdate,
      { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true }
    );

    // Prepare response with full date and time
    const formattedCustomer = {
      id: originalCustomer._id,
      created_at: getIndiaTime(originalCustomer.created_at),
      updated_at: getIndiaTime(originalCustomer.updated_at),
      follow_up_date: callHistory.follow_up_date ? getIndiaTime(callHistory.follow_up_date) : null,
      date: getIndiaTime(originalCustomer.created_at).split(" ")[0],
      full_name: originalCustomer.full_name,
      primary_contact: originalCustomer.primary_contact,
      callStatus: callStatusRecord.call_status_name,
      follow_up: callStatusRecord.follow_up,
      comments: callHistory.notes || "",
      package_name: "No Package Enrolled",
      package_expire: "NA",
      status: customerStatus,
      action: "View",
    };

    return res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      data: formattedCustomer,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update customer",
      error: error.message,
    });
  }
};

// Delete customer
const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCustomer = await Customer.findByIdAndDelete(id);

    if (!deletedCustomer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    const formattedCustomer = {
      id: deletedCustomer._id,
      created_at: getIndiaTime(deletedCustomer.created_at),
      follow_up_date: getIndiaTime(deletedCustomer.created_at).split(" ")[0],
      date: getIndiaTime(deletedCustomer.created_at).split(" ")[0],
      full_name: deletedCustomer.full_name,
      primary_contact: deletedCustomer.primary_contact,
      callStatus: deletedCustomer.callStatus || "Not Called",
      follow_up: deletedCustomer.follow_up || "No",
      package_name: deletedCustomer.package_name || "No Package Enrolled",
      package_expire: deletedCustomer.package_expire || "NA",
      status: deletedCustomer.status || "Active",
      action: "View",
    };

    return res.status(200).json({
      success: true,
      message: "Customer deleted successfully",
      data: formattedCustomer,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete customer",
      error: error.message,
    });
  }
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};