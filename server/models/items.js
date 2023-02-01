const { Schema, model } = require('mongoose');

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
  todo: {
    type: Schema.Types.ObjectId,
    ref: 'Todo',
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = model("Item", itemSchema);
