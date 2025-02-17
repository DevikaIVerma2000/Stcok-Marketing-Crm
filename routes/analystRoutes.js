const express = require("express");
const { createAnalyst, getAllAnalysts, getAnalystById, updateAnalyst, deleteAnalyst } = require("../controllers/analystController");
const { requireAuth } = require("../middlewares/userMiddleware"); 
const router = express.Router();

router.post("/analyst", requireAuth, createAnalyst);  
router.get("/analyst", getAllAnalysts);             
router.get("/analyst/:id", getAnalystById);       
router.put("/analyst/:id", requireAuth, updateAnalyst); 
router.delete("/analyst/:id", requireAuth, deleteAnalyst);

module.exports = router;
