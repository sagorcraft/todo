const mongoose = require("mongoose");
const { Schema } = mongoose;

let todoSchema = new Schema({
  task: {
    type: String,
    required: true,
  },

  priority: {
    type: String,
    enum: ["none", "high", "moderate", "low"],
    default: "none",
  },
});

module.exports = mongoose.model("Task", todoSchema);
