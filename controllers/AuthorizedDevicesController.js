const AuthorizedDevices = require('../models/AuthorizedDevicesModel');

// Create a new authorized device
exports.createDevice = async (req, res) => {
    try {
        const deviceData = {
            ...req.body,
            ip_address: req.ip  // Captures the request IP address
        };

        const device = new AuthorizedDevices(deviceData);
        await device.save();
        res.status(201).json(device);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all authorized devices
exports.getAllDevices = async (req, res) => {
    try {
        const devices = await AuthorizedDevices.find();
        res.json(devices);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single authorized device by ID
exports.getDeviceById = async (req, res) => {
    try {
        const device = await AuthorizedDevices.findById(req.params.id);
        if (!device) return res.status(404).json({ message: 'Device not found' });
        res.json(device);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an authorized device by ID
exports.updateDevice = async (req, res) => {
    try {
        const device = await AuthorizedDevices.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!device) return res.status(404).json({ message: 'Device not found' });
        res.json(device);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete an authorized device by ID (soft delete)
exports.deleteDevice = async (req, res) => {
    try {
        const device = await AuthorizedDevices.findByIdAndUpdate(req.params.id, { deleted_at: new Date() }, { new: true });
        if (!device) return res.status(404).json({ message: 'Device not found' });
        res.json({ message: 'Device deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
