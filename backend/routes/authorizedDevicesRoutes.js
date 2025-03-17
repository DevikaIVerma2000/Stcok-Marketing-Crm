const express = require('express');
const router = express.Router();
const authorizedDevicesController = require('../controllers/authorizedDevicesController');

router.post('/', authorizedDevicesController.createDevice);
router.get('/', authorizedDevicesController.getAllDevices);
router.get('/:id', authorizedDevicesController.getDeviceById);
router.put('/:id', authorizedDevicesController.updateDevice);
router.delete('/:id', authorizedDevicesController.deleteDevice);

module.exports = router;
