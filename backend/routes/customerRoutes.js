const express = require("express");
const {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  updateCustomerInfo,
  searchCustomers,
  searchAdvancedCustomer,
  deleteCustomer,
} = require("../controllers/customerController");
const { requireAuth } = require("../middlewares/userMiddleware");
const router = express.Router();

// create customer
router.post("/customers", requireAuth, createCustomer);

// get all detail of customer
router.get("/customers", requireAuth, getAllCustomers);

// get detail particular Id
router.get("/customers/:id", requireAuth, getCustomerById);

// update follow and follow up date
router.put("/customers/:id", requireAuth, updateCustomer);

// update a customer detail
router.put("/customersInfo/:id", requireAuth, updateCustomerInfo);

// search customer with contact_name , name and email
router.post("/customers/search", requireAuth, searchCustomers);

// Advanced search for customers (across all fields)
router.post("/customers/advanced-search", requireAuth, searchAdvancedCustomer);

// soft delete a customer
router.delete("/customers/:id", requireAuth, deleteCustomer);

module.exports = router;
