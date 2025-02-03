const Migration = require('../models/migrationsModel');

// Create a new migration
const createMigration = async (req, res) => {
  try {
    const newMigration = new Migration(req.body);
    await newMigration.save();
    res.status(201).json({
      success: true,
      message: 'Migration created successfully',
      data: newMigration,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating migration',
      error: error.message,
    });
  }
};

// Get all migrations
const getAllMigrations = async (req, res) => {
  try {
    const migrations = await Migration.find();
    res.status(200).json({
      success: true,
      message: 'Migrations retrieved successfully',
      data: migrations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching migrations',
      error: error.message,
    });
  }
};

// Get migration by ID
const getMigrationById = async (req, res) => {
  try {
    const { id } = req.params;
    const migration = await Migration.findById(id);

    if (!migration) {
      return res.status(404).json({
        success: false,
        message: 'Migration not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Migration retrieved successfully',
      data: migration,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching migration',
      error: error.message,
    });
  }
};

// Update migration by ID
const updateMigration = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMigration = await Migration.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedMigration) {
      return res.status(404).json({
        success: false,
        message: 'Migration not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Migration updated successfully',
      data: updatedMigration,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating migration',
      error: error.message,
    });
  }
};

// Delete migration by ID
const deleteMigration = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMigration = await Migration.findByIdAndDelete(id);

    if (!deletedMigration) {
      return res.status(404).json({
        success: false,
        message: 'Migration not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Migration deleted successfully',
      data: deletedMigration,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting migration',
      error: error.message,
    });
  }
};

module.exports = {
  createMigration,
  getAllMigrations,
  getMigrationById,
  updateMigration,
  deleteMigration,
};
