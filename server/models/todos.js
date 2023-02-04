const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  arrange: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    type: Schema.Types.ObjectId,
    ref: "Item"
  }],
});

module.exports = model("Todo", todoSchema);
