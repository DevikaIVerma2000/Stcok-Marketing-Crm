const mongoose = require("mongoose");

const AnalystsSchema = new mongoose.Schema({
  analyst_name: { type: String, required: true },
  analyst_license: { type: String, required: true },
  analyst_address: { type: String, required: true },
  analyst_primary_phone: { type: String, required: true },
  analyst_email: { type: String, required: true },
  analyst_fees: { type: mongoose.Types.Decimal128, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, default: null },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  branch_id: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null }
});

const AnalystsModel = mongoose.model("Analyst", AnalystsSchema);
module.exports = AnalystsModel;
