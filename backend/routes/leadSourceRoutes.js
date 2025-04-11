const express = require('express');
const { createLeadSource, getAllLeadSources, getLeadSourceById, updateLeadSource, deleteLeadSource } = require('../controllers/leadSourceController');
const { requireAuth } = require('../middlewares/userMiddleware');

const router = express.Router();

router.route('/leadSources')
    .get(requireAuth, getAllLeadSources)
    .post(requireAuth, createLeadSource);

router.route('/leadSources/:id')
    .get(requireAuth, getLeadSourceById)
    .put(requireAuth, updateLeadSource)
    .delete(requireAuth, deleteLeadSource);

module.exports = router;