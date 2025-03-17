const express = require('express');
const router = express.Router();
const { createAccessRequest,getAllAccessRequests,getAccessRequestById, updateAccessRequest, deleteAccessRequest} = require('../controllers/AccessRequestController');


router.post('/access-requests', createAccessRequest);

router.get('/access-requests', getAllAccessRequests);

router.get('/access-requests/:id', getAccessRequestById);

router.put('/access-requests/:id', updateAccessRequest);

router.delete('/access-requests/:id', deleteAccessRequest);

module.exports = router;
