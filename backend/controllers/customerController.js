const Customer = require("../models/customerModel");
const CallStatuses = require("../models/callStatusesModel");
const CallHistory = require("../models/callHistoryModel");
const { getIndiaTime } = require("../utils/time");


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
    const pipeline = [
      { $match: {} },
      // Join with CallHistory to get the latest record
      {
        $lookup: {
          from: "callhistories",
          let: { customerId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$customer_id", "$$customerId"] } } },
            { $sort: { updatedAt: -1 } },
            { $limit: 1 },
          ],
          as: "callHistory",
        },
      },
      // Unwind callHistory (since we only want the latest)
      { $unwind: { path: "$callHistory", preserveNullAndEmptyArrays: true } },
      // Join with CallStatuses
      {
        $lookup: {
          from: "callstatuses",
          localField: "callHistory.call_status_id",
          foreignField: "_id",
          as: "callStatus",
        },
      },
      { $unwind: { path: "$callStatus", preserveNullAndEmptyArrays: true } },
      // Format the response
      {
        $project: {
          id: "$_id",
          follow_up_date: {
            $cond: [
              { $ifNull: ["$callHistory.follow_up_date", false] },
              { $dateToString: { format: "%Y-%m-%d %H:%M:%S", date: "$callHistory.follow_up_date", timezone: "+05:30" } },
              null,
            ],
          },
          date: { $dateToString: { format: "%Y-%m-%d", date: "$created_at", timezone: "+05:30" } },
          full_name: 1,
          primary_contact: 1,
          callStatus: { $ifNull: ["$callStatus.call_status_name", "Not Called"] },
          follow_up: { $ifNull: ["$callStatus.follow_up", "No"] },
          package_name: { $ifNull: ["$package_name", "No Package Enrolled"] },
          package_expire: { $ifNull: ["$package_expire", "NA"] },
          status: { $ifNull: ["$status", "Active"] },
          action: "View",
        },
      },
    ];

    const customers = await Customer.aggregate(pipeline);

    if (!customers.length) {
      return res.status(404).json({
        success: false,
        message: "No customers found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Get all customers",
      total: customers.length,
      data: customers,
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

    const pipeline = [

      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      // Join with CallHistory to get the latest record
      {
        $lookup: {
          from: "callhistories",
          let: { customerId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$customer_id", "$$customerId"] } } },
            { $sort: { updatedAt: -1 } },
            { $limit: 1 },
          ],
          as: "callHistory",
        },
      },
      { $unwind: { path: "$callHistory", preserveNullAndEmptyArrays: true } },
      // Join with CallStatuses
      {
        $lookup: {
          from: "callstatuses",
          localField: "callHistory.call_status_id",
          foreignField: "_id",
          as: "callStatus",
        },
      },
      { $unwind: { path: "$callStatus", preserveNullAndEmptyArrays: true } },
      // Format the response
      {
        $project: {
          id: "$_id",
          follow_up_date: {
            $cond: [
              { $ifNull: ["$callHistory.follow_up_date", false] },
              { $dateToString: { format: "%Y-%m-%d %H:%M:%S", date: "$callHistory.follow_up_date", timezone: "+05:30" } },
              null,
            ],
          },
          date: { $dateToString: { format: "%Y-%m-%d", date: "$created_at", timezone: "+05:30" } },
          full_name: 1,
          primary_contact: 1,
          callStatus: { $ifNull: ["$callStatus.call_status_name", "Not Called"] },
          follow_up: { $ifNull: ["$callStatus.follow_up", "No"] },
          package_name: { $ifNull: ["$package_name", "No Package Enrolled"] },
          package_expire: { $ifNull: ["$package_expire", "NA"] },
          status: { $ifNull: ["$status", "Active"] },
          action: "View",
        },
      },
    ];

    const customers = await Customer.aggregate(pipeline);

    if (!customers.length) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Customer retrieved successfully",
      data: customers[0],
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
    const { customerStatus, comments, callbackTime, user_id, recording_url } = req.body;

    // Validation
    if (!id || !customerStatus) {
      return res.status(400).json({
        success: false,
        message: "Customer ID and status are required",
      });
    }

    const customerId = new mongoose.Types.ObjectId(id);

    // Find the call status
    const callStatusRecord = await CallStatuses.findOne({
      call_status_name: { $regex: new RegExp(`^${customerStatus}$`, "i") },
    });

    if (!callStatusRecord) {
      return res.status(400).json({
        success: false,
        message: `Invalid call status: "${customerStatus}" not found in call_statuses`,
      });
    }

    // Update call history
    const callHistoryUpdate = {
      customer_id: customerId,
      call_status_id: callStatusRecord._id,
      user_id: user_id ? new mongoose.Types.ObjectId(user_id) : req.user?._id,
      notes: comments || null,
      recording_url: recording_url || null,
      follow_up_date: callbackTime ? new Date(callbackTime) : null,
    };

    await CallHistory.findOneAndUpdate(
      { customer_id: customerId },
      callHistoryUpdate,
      { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true }
    );

    // Fetch updated customer with related data using pipeline
    const pipeline = [
      { $match: { _id: customerId } },
      {
        $lookup: {
          from: "callhistories",
          let: { customerId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$customer_id", "$$customerId"] } } },
            { $sort: { updatedAt: -1 } },
            { $limit: 1 },
          ],
          as: "callHistory",
        },
      },
      { $unwind: { path: "$callHistory", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "callstatuses",
          localField: "callHistory.call_status_id",
          foreignField: "_id",
          as: "callStatus",
        },
      },
      { $unwind: { path: "$callStatus", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          id: "$_id",
          created_at: { $dateToString: { format: "%Y-%m-%d %H:%M:%S", date: "$created_at", timezone: "+05:30" } },
          updated_at: { $dateToString: { format: "%Y-%m-%d %H:%M:%S", date: "$updated_at", timezone: "+05:30" } },
          follow_up_date: {
            $cond: [
              { $ifNull: ["$callHistory.follow_up_date", false] },
              { $dateToString: { format: "%Y-%m-%d %H:%M:%S", date: "$callHistory.follow_up_date", timezone: "+05:30" } },
              null,
            ],
          },
          date: { $dateToString: { format: "%Y-%m-%d", date: "$created_at", timezone: "+05:30" } },
          full_name: 1,
          primary_contact: 1,
          callStatus: { $ifNull: ["$callStatus.call_status_name", "Not Called"] },
          follow_up: { $ifNull: ["$callStatus.follow_up", "No"] },
          comments: { $ifNull: ["$callHistory.notes", ""] },
          package_name: "No Package Enrolled",
          package_expire: "NA",
          status: callStatusRecord.call_status_name,
          action: "View",
        },
      },
    ];

    const customers = await Customer.aggregate(pipeline);

    if (!customers.length) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      data: customers[0],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update customer",
      error: error.message,
    });
  }
};

// Update customer info
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

    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid customer ID",
      });
    }

   
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    // Validate required fields if any are provided
    const requiredFields = { first_name, last_name, full_name, primary_contact, email_id, created_by };
    const isUpdatingRequired = Object.values(requiredFields).some(val => val !== undefined);
    if (isUpdatingRequired) {
      if (!first_name || !last_name || !full_name || !primary_contact || !email_id || !created_by) {
        return res.status(400).json({
          success: false,
          message: "All required fields (first_name, last_name, full_name, primary_contact, email_id, created_by) must be provided",
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
      ].filter(Boolean).join(" ").trim();
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
    await Customer.findByIdAndUpdate(id, { $set: updates }, { new: true, runValidators: true });

    // Fetch updated customer with related data using pipeline
    const pipeline = [
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "callhistories",
          let: { customerId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$customer_id", "$$customerId"] } } },
            { $sort: { updatedAt: -1 } },
            { $limit: 1 },
          ],
          as: "callHistory",
        },
      },
      { $unwind: { path: "$callHistory", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "callstatuses",
          localField: "callHistory.call_status_id",
          foreignField: "_id",
          as: "callStatus",
        },
      },
      { $unwind: { path: "$callStatus", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          id: "$_id",
          full_name: 1,
          primary_contact: 1,
          email_id: 1,
          follow_up_date: {
            $cond: [
              { $ifNull: ["$callHistory.follow_up_date", false] },
              { $dateToString: { format: "%Y-%m-%d %H:%M:%S", date: "$callHistory.follow_up_date", timezone: "+05:30" } },
              null,
            ],
          },
          callStatus: { $ifNull: ["$callStatus.call_status_name", "Not Called"] },
          status: { $ifNull: ["$status", "Active"] },
          created_at: { $dateToString: { format: "%Y-%m-%d %H:%M:%S", date: "$created_at", timezone: "+05:30" } },
          updated_at: { $dateToString: { format: "%Y-%m-%d %H:%M:%S", date: "$updated_at", timezone: "+05:30" } },
        },
      },
    ];

    const customers = await Customer.aggregate(pipeline);

    if (!customers.length) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      data: customers[0],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to update customer",
      error: error.message,
    });
  }
};

// Search customers by primary_contact, full_name, or email_id
const searchCustomers = async (req, res) => {
  try {
    const { primary_contact, full_name, email_id } = req.body;

    const query = {};
    if (primary_contact) query.primary_contact = { $regex: primary_contact, $options: 'i' };
    if (full_name) query.full_name = { $regex: full_name, $options: 'i' };
    if (email_id) query.email_id = { $regex: email_id, $options: 'i' };

    const pipeline = [
      { $match: query },
      {
        $lookup: {
          from: "callhistories",
          let: { customerId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$customer_id", "$$customerId"] } } },
            { $sort: { updatedAt: -1 } },
            { $limit: 1 },
          ],
          as: "callHistory",
        },
      },
      { $unwind: { path: "$callHistory", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "callstatuses",
          localField: "callHistory.call_status_id",
          foreignField: "_id",
          as: "callStatus",
        },
      },
      { $unwind: { path: "$callStatus", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          id: "$_id",
          full_name: 1,
          primary_contact: 1,
          date: { $dateToString: { format: "%Y-%m-%d", date: "$created_at", timezone: "+05:30" } },
          follow_up_date: {
            $cond: [
              { $ifNull: ["$callHistory.follow_up_date", false] },
              { $dateToString: { format: "%Y-%m-%d %H:%M:%S", date: "$callHistory.follow_up_date", timezone: "+05:30" } },
              "No Follow-up Date",
            ],
          },
          callStatus: { $ifNull: ["$callStatus.call_status_name", "Not Called"] },
          follow_up: { $ifNull: ["$callStatus.follow_up", "No"] },
          package_name: { $ifNull: ["$package_name", "No Package Enrolled"] },
          package_expire: { $ifNull: ["$package_expire", "NA"] },
          status: { $ifNull: ["$status", "Active"] },
          action: "View",
        },
      },
    ];

    const customers = await Customer.aggregate(pipeline);

    if (!customers.length) {
      return res.status(404).json({
        success: false,
        message: "No customers found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Customers retrieved successfully",
      total: customers.length,
      data: customers,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to search customers",
      error: err.message,
    });
  }
};

// Advanced search 
const searchAdvancedCustomer = async (req, res) => {
  try {
    const { searchTerm } = req.body;

    if (!searchTerm || typeof searchTerm !== 'string') {
      return res.status(400).json({ success: false, message: "Please provide a valid search term" });
    }

    const searchRegex = { $regex: searchTerm, $options: 'i' };
    const isDate = !isNaN(Date.parse(searchTerm));

    
    const mainPipeline = [
      {
        $match: {
          $or: [
            { full_name: searchRegex },
            { primary_contact: searchRegex },
            {
              $or: [
                { package_name: searchRegex },
                ...(searchTerm.toLowerCase() === "no package enrolled"
                  ? [{ package_name: null }, { package_name: { $exists: false } }]
                  : []),
              ],
            },
            {
              $or: [
                { package_expire: searchRegex },
                ...(searchTerm.toLowerCase() === "na"
                  ? [{ package_expire: null }, { package_expire: { $exists: false } }]
                  : []),
              ],
            },
            ...(isDate
              ? [{
                  created_at: {
                    $gte: new Date(new Date(searchTerm).setHours(0, 0, 0, 0)),
                    $lte: new Date(new Date(searchTerm).setHours(23, 59, 59, 999)),
                  },
                }]
              : []),
          ],
        },
      },
    ];

    let customers = await Customer.aggregate(mainPipeline);

    //  related data (CallHistory and CallStatuses)
    const relatedPipeline = [
      {
        $lookup: {
          from: "callhistories",
          localField: "_id",
          foreignField: "customer_id",
          as: "callHistory",
        },
      },
      { $unwind: { path: "$callHistory", preserveNullAndEmptyArrays: true } },
      {
        $match: {
          $or: [
            ...(isDate
              ? [{
                  "callHistory.follow_up_date": {
                    $gte: new Date(new Date(searchTerm).setHours(0, 0, 0, 0)),
                    $lte: new Date(new Date(searchTerm).setHours(23, 59, 59, 999)),
                  },
                }]
              : []),
            {
              "callHistory.call_status_id": {
                $in: await CallStatuses.find({ call_status_name: searchRegex }).distinct("_id"),
              },
            },
          ],
        },
      },
      { $group: { _id: "$_id" } },
    ];

    const relatedResults = await Customer.aggregate(relatedPipeline);
    const relatedCustomerIds = relatedResults.map(result => result._id);

    // Fetch related customers
    const relatedCustomers = relatedCustomerIds.length > 0
      ? await Customer.find({ _id: { $in: relatedCustomerIds } })
      : [];

    // Combine and deduplicate
    const allCustomers = [...customers, ...relatedCustomers];
    const uniqueCustomers = Array.from(
      new Map(allCustomers.map(c => [c._id.toString(), c])).values()
    );

    if (!uniqueCustomers.length) {
      return res.status(404).json({ success: false, message: "No customers found" });
    }

    // Final pipeline to format the response
    const formatPipeline = [
      { $match: { _id: { $in: uniqueCustomers.map(c => c._id) } } },
      {
        $lookup: {
          from: "callhistories",
          let: { customerId: "$_id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$customer_id", "$$customerId"] } } },
            { $sort: { updatedAt: -1 } },
            { $limit: 1 },
          ],
          as: "callHistory",
        },
      },
      { $unwind: { path: "$callHistory", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "callstatuses",
          localField: "callHistory.call_status_id",
          foreignField: "_id",
          as: "callStatus",
        },
      },
      { $unwind: { path: "$callStatus", preserveNullAndEmptyArrays: true } },
      {
        $project: {
          id: "$_id",
          full_name: 1,
          primary_contact: 1,
          date: { $dateToString: { format: "%Y-%m-%d", date: "$created_at", timezone: "+05:30" } },
          follow_up_date: {
            $cond: [
              { $ifNull: ["$callHistory.follow_up_date", false] },
              { $dateToString: { format: "%Y-%m-%d %H:%M:%S", date: "$callHistory.follow_up_date", timezone: "+05:30" } },
              null,
            ],
          },
          callStatus: { $ifNull: ["$callStatus.call_status_name", "Not Called"] },
          follow_up: { $ifNull: ["$callStatus.follow_up", "No"] },
          package_name: { $ifNull: ["$package_name", "No Package Enrolled"] },
          package_expire: { $ifNull: ["$package_expire", "NA"] },
          status: { $ifNull: ["$status", "Active"] },
          action: "View",
        },
      },
    ];

    const formattedData = await Customer.aggregate(formatPipeline);

    return res.status(200).json({
      success: true,
      message: "Customers retrieved successfully",
      total: formattedData.length,
      data: formattedData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to search customers",
      error: error.message,
    });
  }
};

// asigned to delete customer 


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