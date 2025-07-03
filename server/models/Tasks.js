const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
      enum: ['To Do', 'Doing', 'Done'],
      default: 'To Do',
    },
  },
  { timestamps: true } 
);

module.exports = mongoose.model('Task', TaskSchema);
