const express = require('express');
const router = express.Router();
const {createDesignation,getAllDesignations,getDesignationById,updateDesignation,deleteDesignation} = require('../controllers/designationsController');


router.post('/designations', createDesignation);
router.get('/designations', getAllDesignations);
router.get('/designations/:id', getDesignationById);
router.put('/designations/:id', updateDesignation);
router.delete('/designations/:id', deleteDesignation);
module.exports = router;
