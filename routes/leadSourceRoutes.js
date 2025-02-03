const express = require('express');
const { createLeadSource, getAllLeadSources, getLeadSourceById, updateLeadSource, deleteLeadSource } = require('../controllers/leadSourceController');
const router = express.Router();

router.route('/')
  .get(getAllLeadSources)
  .post(createLeadSource);

router.route('/:id')
  .get(getLeadSourceById)
  .put(updateLeadSource)
  .delete(deleteLeadSource);

module.exports = router;
