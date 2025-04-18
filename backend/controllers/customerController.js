const Customer = require("../models/customerModel"); 
const callStatus = require("../models/callStatusesModel");
const CallHistory = require("../models/callHistoryModel") 
const { getIndiaTime } = require("../utils/time");

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
      created_by 
    } = req.body;

    if (!first_name || !last_name || !full_name || !primary_contact || !email_id || !created_by) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: first_name, last_name, full_name, primary_contact, email_id, created_by' 
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
      country: country || 'INDIA',
      pancard: pancard || undefined,
      pan_proof_url: pan_proof_url || undefined,
      aadhaar_card: aadhaar_card || undefined,
      aadhaar_proof_url: aadhaar_proof_url || undefined,
      kyc_status: kyc_status === 'on' ? 1 : 0,
      compliance_status: compliance_status === 'on' ? 1 : 0,
      gst_number: gst_number || undefined,
      gst_number_url: gst_number_url || undefined,
      welcome_email_status: welcome_email_status === 'on' ? 1 : 0,
      dnc: dnc === 'on' ? 1 : 0,
      created_by,
    });

    await customer.save();

    return res.status(201).json({
      success: true,
      message: 'Customer created successfully',
      data: {
        id: customer._id,
        ...customer._doc
      }
    });
  } catch (error) {
    return res.status(500).json({ 
      success: false, 
      message: 'Failed to create customer', 
      error: error.message 
    });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();

    if (!customers.length) {
      return res.status(404).json({
        success: false,
        message: "No customers found",
      });
    }

    const formattedCustomers = customers.map((customer) => ({
      id: customer._id,
      follow_up_date: getIndiaTime(customer.created_at),
      date: customer.created_at ? new Date(customer.created_at).toISOString().split('T')[0] : null,
      full_name: customer.full_name,
      primary_contact: customer.primary_contact,
      callStatus: customer.callStatus || "Not Called",
      package_name: customer.package_name || "No Package Enrolled",
      package_expire: customer.package_expire || "NA",
      status: customer.status || "Active",
      action: "View",
    }));

    return res.status(200).json({
      success: true,
      message: "Get all customers",
      total: customers.length,
      data: formattedCustomers,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve customers",
      error: err.message,
    });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    const formattedCustomer = {
      id: customer._id,
      follow_up_date: getIndiaTime(customer.created_at),
      date: customer.created_at ? new Date(customer.created_at).toISOString().split('T')[0] : null,
      full_name: customer.full_name,
      primary_contact: customer.primary_contact,
      callStatus: customer.callStatus || "Not Called",
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

const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCustomer = await Customer.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCustomer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    const formattedCustomer = {
      id: updatedCustomer._id,
      created_at: getIndiaTime(updatedCustomer.created_at),
      follow_up_date: updatedCustomer.created_at ? new Date(updatedCustomer.created_at).toISOString().split('T')[0] : null,
      date: updatedCustomer.created_at ? new Date(updatedCustomer.created_at).toISOString().split('T')[0] : null,
      full_name: updatedCustomer.full_name,
      primary_contact: updatedCustomer.primary_contact,
      callStatus: updatedCustomer.callStatus || "Not Called",
      package_name: updatedCustomer.package_name || "No Package Enrolled",
      package_expire: updatedCustomer.package_expire || "NA",
      status: updatedCustomer.status || "Active",
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
      follow_up_date: deletedCustomer.created_at ? new Date(deletedCustomer.created_at).toISOString().split('T')[0] : null,
      date: deletedCustomer.created_at ? new Date(deletedCustomer.created_at).toISOString().split('T')[0] : null,
      full_name: deletedCustomer.full_name,
      primary_contact: deletedCustomer.primary_contact,
      callStatus: deletedCustomer.callStatus || "Not Called",
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

// Export all functions
module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};