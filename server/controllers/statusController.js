const Status = require('../models/Status');

// Get all statuses
exports.getStatuses = async (req, res) => {
  try {
    const statuses = await Status.find();
    res.json(statuses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new status
exports.createStatus = async (req, res) => {
  try {
    const { name } = req.body;
    const status = new Status({ name });
    await status.save();
    res.status(201).json(status);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a status
exports.updateStatus = async (req, res) => {
  try {
    const status = await Status.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!status) return res.status(404).json({ message: 'Status not found' });
    res.json(status);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a status
exports.deleteStatus = async (req, res) => {
  try {
    const status = await Status.findByIdAndDelete(req.params.id);
    if (!status) return res.status(404).json({ message: 'Status not found' });
    res.json({ message: 'Status deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
