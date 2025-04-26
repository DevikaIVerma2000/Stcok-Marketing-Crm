const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  role: { type: String, required: true },
  role_name: { type: String, required: true, unique: true }, 
  restriction_level: { type: String, required: true },
  clearance_permission: { type: Number, required: true },
  role_description: { type: String, required: true },
  support_user: { type: Number, default: 0 },
  lead_add: { type: Number, default: 0 },
  lead_view: { type: Number, default: 0 },
  lead_update: { type: Number, default: 0 },
  lead_delete: { type: Number, default: 0 },
  lead_reports: { type: Number, default: 0 },
  lead_bulk_download: { type: Number, default: 0 },
  data_management: { type: Number, default: 0 },
  customer_add: { type: Number, default: 0 },
  customer_view: { type: Number, default: 0 },
  customer_update: { type: Number, default: 0 },
  customer_delete: { type: Number, default: 0 },
  customer_reports: { type: Number, default: 0 },
  employee_add: { type: Number, default: 0 },
  employee_view: { type: Number, default: 0 },
  employee_update: { type: Number, default: 0 },
  employee_delete: { type: Number, default: 0 },
  employee_reports: { type: Number, default: 0 },
  attendance_management: { type: Number, default: 0 },
  payment_management: { type: Number, default: 0 },
  sales_report: { type: Number, default: 0 },
  download_data: { type: Number, default: 0 },
  manage_branches: { type: Number, default: 0 },
  manage_org: { type: Number, default: 0 },
  system_settings: { type: Number, default: 0 },
  created_by: { type: String, default: null },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: null },
  deleted_at: { type: Date, default: null }
});

const Role = mongoose.model('Role', roleSchema);
module.exports = Role;   
