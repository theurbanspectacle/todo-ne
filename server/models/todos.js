const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  items: [itemSchema]
});

module.exports = model("Todo", todoSchema);