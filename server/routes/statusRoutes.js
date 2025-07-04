const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController');

// Get all statuses
router.get('/', statusController.getStatuses);

// Create a new status
router.post('/', statusController.createStatus);

// Update a status
router.put('/:id', statusController.updateStatus);

// Delete a status
router.delete('/:id', statusController.deleteStatus);

module.exports = router;
