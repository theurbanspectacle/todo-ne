const { Schema, model } = require('mongoose');

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  items: [{
    type: Schema.Types.ObjectId,
    ref: "Item"
  }],
});

module.exports = model("Todo", todoSchema);