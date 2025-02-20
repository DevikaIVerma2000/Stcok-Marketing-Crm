const express = require('express');
const router = express.Router();
const {createDepartment, getAllDepartments,getDepartmentById,updateDepartment,deleteDepartment,} = require('../controllers/departmentsController');

router.post('/departments', createDepartment);
router.get('/departments', getAllDepartments);
router.get('/departments/:id', getDepartmentById);
router.put('/departments/:id', updateDepartment);
router.delete('/departments/:id', deleteDepartment);

module.exports = router;
