const Task = require('../models/Tasks');
const Status = require('../models/Status');

// GET all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate('statusId', 'name');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET single task by ID
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('statusId', 'name');
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE new task
exports.createTask = async (req, res) => {
  try {
    const { title, description, statusId } = req.body;
    const task = new Task({ title, description, statusId });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get tasks by status
exports.statusTasks = async (req, res) => {
  try {
    const statusTasks = await Task.find({ statusId: req.params.id }).populate('statusId', 'name');
    res.json(statusTasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
