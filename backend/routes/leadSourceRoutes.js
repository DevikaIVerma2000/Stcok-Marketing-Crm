const express = require('express');
const { createLeadSource, getAllLeadSources, getLeadSourceById, updateLeadSource, deleteLeadSource } = require('../controllers/leadSourceController');
const router = express.Router();

router.route('/leadSources')
  .get(getAllLeadSources)
  .post(createLeadSource);

router.route('/leadSources/:id')
  .get(getLeadSourceById)
  .put(updateLeadSource)
  .delete(deleteLeadSource);

module.exports = router;
