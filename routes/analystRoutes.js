const express = require("express");
const { createAnalyst, getAllAnalysts, getAnalystById, updateAnalyst, deleteAnalyst } = require("../controllers/analystController");
const { requireAuth } = require("../middleware/authMiddleware"); 
const router = express.Router();

router.post("/create", requireAuth, createAnalyst);  
router.get("/", getAllAnalysts);                    
router.get("/:id", getAnalystById);                 
router.put("/:id", requireAuth, updateAnalyst);      
router.delete("/:id", requireAuth, deleteAnalyst);   

module.exports = router;
