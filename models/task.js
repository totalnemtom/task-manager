const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: String,
  complated: Boolean,
});

module.exports = mongoose.model("Task", TaskSchema);
