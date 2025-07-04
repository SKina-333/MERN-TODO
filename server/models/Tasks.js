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
    statusId: { type: mongoose.Schema.Types.ObjectId, ref: 'Status', required: true },
  },
  { timestamps: true } 
);

module.exports = mongoose.model('Task', TaskSchema);
