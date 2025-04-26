const Customer = require("../models/customerModel");
const CallStatuses = require("../models/callStatusesModel");
const CallHistory = require("../models/callHistoryModel");
const { getIndiaTime } = require("../utils/time");
const { default: mongoose } = require("mongoose");
const { options } = require("../routes/customerRoutes");

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

    if (
      !first_name ||
      !last_name ||
      !full_name ||
      !primary_contact ||
      !email_id ||
      !created_by
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: first_name, last_name, full_name, primary_contact, email_id, created_by",
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
        const callHistory = await CallHistory.findOne({
          customer_id: customer._id,
        }).sort({ updatedAt: -1 });
        let callStatusRecord = null;
        if (callHistory && callHistory.call_status_id) {
          callStatusRecord = await CallStatuses.findOne({
            _id: callHistory.call_status_id,
          });
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
          callStatus: callStatusRecord
            ? callStatusRecord.call_status_name
            : customer.callStatus || "Not Called",
          follow_up: callStatusRecord
            ? callStatusRecord.follow_up
            : customer.follow_up || "No",
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
    const callHistory = await CallHistory.findOne({ customer_id: id }).sort({
      updatedAt: -1,
    });
    const followUpDate = callHistory?.follow_up_date
      ? getIndiaTime(callHistory.follow_up_date)
      : null;

    // Find the call status from call_statuses table using call_status_id from call history
    let callStatusRecord = null;
    if (callHistory && callHistory.call_status_id) {
      // Assuming call_status_id might be an integer due to the auto-incremented id in the callstatuses table
      callStatusRecord = await CallStatuses.findOne({
        _id: callHistory.call_status_id,
      });
      if (!callStatusRecord) {
        // Fallback to case-insensitive name search if ID lookup fails
        const callStatusValue = customer.callStatus
          ? customer.callStatus.trim()
          : "";
        callStatusRecord = await CallStatuses.findOne({
          call_status_name: { $regex: new RegExp(`^${callStatusValue}$`, "i") },
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
      callStatus: callStatusRecord
        ? callStatusRecord.call_status_name
        : customer.callStatus || "Not Called",
      follow_up: callStatusRecord
        ? callStatusRecord.follow_up
        : customer.follow_up || "No",
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

// Update customer details - follow up and follow up date
const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { customerStatus, comments, callbackTime, user_id, recording_url } =
      req.body;

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
      call_status_name: { $regex: new RegExp(`^${customerStatus}$`, "i") },
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
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
        runValidators: true,
      }
    );

    // Prepare response with full date and time
    const formattedCustomer = {
      id: originalCustomer._id,
      created_at: getIndiaTime(originalCustomer.created_at),
      updated_at: getIndiaTime(originalCustomer.updated_at),
      follow_up_date: callHistory.follow_up_date
        ? getIndiaTime(callHistory.follow_up_date)
        : null,
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

// update customer details -
const updateCustomerInfo = async (req, res) => {
  try {
    const { id } = req.params;
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

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid customer ID",
      });
    }

    // Check if customer exists
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    // Validate required fields if any are provided
    const requiredFields = {
      first_name,
      last_name,
      full_name,
      primary_contact,
      email_id,
      created_by,
    };
    const isUpdatingRequired = Object.values(requiredFields).some(
      (val) => val !== undefined
    );
    if (isUpdatingRequired) {
      if (!first_name || !last_name || !full_name || !primary_contact || !email_id || !created_by) {
        return res.status(400).json({
          success: false,
          message:
            "All required fields (first_name, last_name, full_name, primary_contact, email_id, created_by) must be provided",
        });
      }
    }

    // Compute full_name if needed
    let computedFullName = full_name;
    if (first_name || middle_name || last_name) {
      computedFullName = [
        first_name || customer.first_name,
        middle_name !== undefined ? middle_name : customer.middle_name,
        last_name || customer.last_name,
      ]
        .filter(Boolean)
        .join(" ")
        .trim();
    }

    // Build update object
    const updates = {
      suffix: suffix !== undefined ? suffix : customer.suffix,
      first_name: first_name || customer.first_name,
      middle_name: middle_name !== undefined ? middle_name : customer.middle_name,
      last_name: last_name || customer.last_name,
      full_name: computedFullName || customer.full_name,
      company_name: company_name !== undefined ? company_name : customer.company_name,
      primary_contact: primary_contact || customer.primary_contact,
      secondary_contact: secondary_contact !== undefined ? secondary_contact : customer.secondary_contact,
      email_id: email_id || customer.email_id,
      date_of_birth: date_of_birth !== undefined ? date_of_birth : customer.date_of_birth,
      address: address !== undefined ? address : customer.address,
      city: city !== undefined ? city : customer.city,
      state: state !== undefined ? state : customer.state,
      zipcode: zipcode !== undefined ? zipcode : customer.zipcode,
      country: country || customer.country,
      pancard: pancard !== undefined ? pancard : customer.pancard,
      pan_proof_url: pan_proof_url !== undefined ? pan_proof_url : customer.pan_proof_url,
      aadhaar_card: aadhaar_card !== undefined ? aadhaar_card : customer.aadhaar_card,
      aadhaar_proof_url: aadhaar_proof_url !== undefined ? aadhaar_proof_url : customer.aadhaar_proof_url,
      kyc_status: kyc_status !== undefined ? (kyc_status === "on" ? 1 : 0) : customer.kyc_status,
      compliance_status: compliance_status !== undefined ? (compliance_status === "on" ? 1 : 0) : customer.compliance_status,
      gst_number: gst_number !== undefined ? gst_number : customer.gst_number,
      gst_number_url: gst_number_url !== undefined ? gst_number_url : customer.gst_number_url,
      welcome_email_status: welcome_email_status !== undefined ? (welcome_email_status === "on" ? 1 : 0) : customer.welcome_email_status,
      dnc: dnc !== undefined ? (dnc === "on" ? 1 : 0) : customer.dnc,
      created_by: created_by || customer.created_by,
      updated_at: new Date(),
    };

    // Update customer
    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    // Fetch call history
    const callHistory = await CallHistory.findOne({ customer_id: id }).sort({ updatedAt: -1 });
    const followUpDate = callHistory?.follow_up_date ? getIndiaTime(callHistory.follow_up_date) : null;

    // Fetch call status
    let callStatusRecord = null;
    if (callHistory && callHistory.call_status_id) {
      callStatusRecord = await CallStatuses.findOne({ _id: callHistory.call_status_id });
    }

    // Format response
    const formattedCustomer = {
      id: updatedCustomer._id,
      full_name: updatedCustomer.full_name,
      primary_contact: updatedCustomer.primary_contact,
      email_id: updatedCustomer.email_id,
      follow_up_date: followUpDate,
      callStatus: callStatusRecord ? callStatusRecord.call_status_name : updatedCustomer.callStatus || "Not Called",
      status: updatedCustomer.status || "Active",
      created_at: getIndiaTime(updatedCustomer.created_at),
      updated_at: getIndiaTime(updatedCustomer.updated_at),
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

// search with contactNumber , name , email
const searchCustomers = async (req, res) => {
  try {
    const { primary_contact, full_name, email_id } = req.body;

    const query = {};

    if (primary_contact) {
      query.primary_contact = { $regex: primary_contact, $options: 'i' };
    }

    if (full_name) {
      query.full_name = { $regex: full_name, $options: 'i' };
    }

    if (email_id) {
      query.email_id = { $regex: email_id, $options: 'i' };
    }

    const customers = await Customer.find(query);

    if (!customers.length) {
      return res.status(404).json({
        success: false,
        message: "No customers found",
      });
    }

    // format customer data
    const data = await Promise.all(
      customers.map(async (customer) => {
        const callHistory = await CallHistory.findOne({ customer_id: customer._id }).sort({ updatedAt: -1 });

        const callStatus = callHistory?.call_status_id 
          ? await CallStatuses.findOne({ _id: callHistory.call_status_id })
          : null;

        const followUpDate = callHistory?.follow_up_date
          ? getIndiaTime(callHistory.follow_up_date)
          : "No Follow-up Date";

        return {
          id: customer._id,
          full_name: customer.full_name,
          primary_contact: customer.primary_contact,
          date: getIndiaTime(customer.created_at).split(" ")[0],
          follow_up_date: followUpDate,
          callStatus: callStatus?.call_status_name || "Not Called",
          follow_up: callStatus?.follow_up || "No",
          package_name: customer.package_name || "No Package Enrolled",
          package_expire: customer.package_expire || "NA",
          status: customer.status || "Active",
          action: "View",
        };
      })
    );

    // send response
    return res.status(200).json({
      success: true,
      message: "Customers retrieved successfully",
      total: data.length,
      data,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to search customers",
      error: err.message,
    });
  }
};

// Advanced search across all fields
const searchAdvancedCustomer = async (req, res) => {
  try {

    const { searchTerm } = req.body;

    // Validate the search term
    if (!searchTerm || typeof searchTerm !== 'string') {
      return res.status(400).json({
        success: false,
        message: "A valid search term is required",
      });
    }

    
    const query = {
      $or: [
        
        { full_name: { $regex: searchTerm, $options: 'i' } },
        
        { primary_contact: { $regex: searchTerm, $options: 'i' } },
       
        { package_name: { $regex: searchTerm, $options: 'i' } },
        
        { package_expire: { $regex: searchTerm, $options: 'i' } },
      ],
    };

    // Handle Date (created_at) search
    const isDateSearch = !isNaN(Date.parse(searchTerm));
    if (isDateSearch) {
      const date = new Date(searchTerm);
      const startOfDay = new Date(date.setHours(0, 0, 0, 0));
      const endOfDay = new Date(date.setHours(23, 59, 59, 999));
      query.$or.push({ created_at: { $gte: startOfDay, $lte: endOfDay } });
    }

    
    let customers = await Customer.find(query);

   
    let customerIdsFromHistory = [];
    if (isDateSearch) {
      const date = new Date(searchTerm);
      const startOfDay = new Date(date.setHours(0, 0, 0, 0));
      const endOfDay = new Date(date.setHours(23, 59, 59, 999));
      const callHistories = await CallHistory.find({
        follow_up_date: { $gte: startOfDay, $lte: endOfDay },
      });
      customerIdsFromHistory = callHistories.map(history => history.customer_id);
    }

    // Search Follow Up (call_status_name)
    const callStatuses = await CallStatuses.find({
      call_status_name: { $regex: searchTerm, $options: 'i' },
    });
    const callStatusIds = callStatuses.map(status => status._id);
    const callHistoriesWithStatus = await CallHistory.find({
      call_status_id: { $in: callStatusIds },
    });

    // Collect customer IDs from CallHistory and CallStatuses
    const customerIdsFromStatus = callHistoriesWithStatus.map(history => history.customer_id);
    const allCustomerIds = [...new Set([...customerIdsFromHistory, ...customerIdsFromStatus])];

    // Fetch additional customers based on these IDs
    const additionalCustomers = await Customer.find({ _id: { $in: allCustomerIds } });

    // Combine and deduplicate customers
    const allCustomers = [...customers, ...additionalCustomers];
    const uniqueCustomers = Array.from(
      new Map(allCustomers.map(customer => [customer._id.toString(), customer])).values()
    );

    // Return if no customers found
    if (!uniqueCustomers.length) {
      return res.status(404).json({
        success: false,
        message: "No customers found",
      });
    }

    // Format the customer data
    const data = await Promise.all(
      uniqueCustomers.map(async (customer) => {
        const callHistory = await CallHistory.findOne({ customer_id: customer._id }).sort({ updatedAt: -1 });
        const callStatus = callHistory?.call_status_id
          ? await CallStatuses.findOne({ _id: callHistory.call_status_id })
          : null;
        const followUpDate = callHistory?.follow_up_date
          ? getIndiaTime(callHistory.follow_up_date)
          : null;

        return {
          id: customer._id,
          follow_up_date: followUpDate,
          date: getIndiaTime(customer.created_at).split(" ")[0],
          full_name: customer.full_name,
          primary_contact: customer.primary_contact,
          callStatus: callStatus?.call_status_name || "Not Called",
          follow_up: callStatus?.follow_up || "No",
          package_name: customer.package_name || "No Package Enrolled",
          package_expire: customer.package_expire || "NA",
          status: customer.status || "Active",
          action: "View",
        };
      })
    );

    // Send the response
    return res.status(200).json({
      success: true,
      message: "Customers retrieved successfully",
      total: uniqueCustomers.length,
      data,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to search customers",
      error: err.message,
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
  updateCustomerInfo,
  searchCustomers,
  searchAdvancedCustomer,
  deleteCustomer,
};
