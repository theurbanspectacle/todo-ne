const { Schema, model } = require('mongoose');
// const dateFormat = require('../utils/dateFormat');

const itemSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  priority: {
    type: Number,
    min: 1,
    max: 5,
    default: 0
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
   dueDate: {
    type: Date
  },
});

module.exports = model("Item", itemSchema);
