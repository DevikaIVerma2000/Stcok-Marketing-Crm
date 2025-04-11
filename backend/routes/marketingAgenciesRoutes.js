const express = require('express');
const router = express.Router();
const {
  createMarketingAgency,
  getAllMarketingAgencies,
  getMarketingAgencyById,
  updateMarketingAgency,
  deleteMarketingAgency,
} = require('../controllers/marketingAgenciesController');
const { requireAuth } = require('../middlewares/userMiddleware');

router.post('/marketingAgencies', requireAuth, createMarketingAgency);
router.get('/marketingAgencies', requireAuth, getAllMarketingAgencies);
router.get('/marketingAgencies/:id', requireAuth, getMarketingAgencyById);
router.put('/marketingAgencies/:id', requireAuth, updateMarketingAgency);
router.delete('/marketingAgencies/:id', requireAuth, deleteMarketingAgency);

module.exports = router;