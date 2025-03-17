const express = require('express');
const { createMigration,getAllMigrations,getMigrationById,updateMigration,deleteMigration} = require('../controllers/migrationsController');

const router = express.Router();

router.post('/migrations', createMigration);
router.get('/migrations', getAllMigrations);
router.get('/migrations/:id', getMigrationById);
router.put('/migrations/:id', updateMigration);
router.delete('/migrations/:id', deleteMigration);

module.exports = router;
