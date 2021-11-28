const mongoose = require("mongoose");

const TriggerSchema = mongoose.Schema({
  trigger: { type: String, required: true, unique: true },
  response: { type: String, required: true },
  author: { type: String, required: true },
  created_at: { type: Date, required: true },
});

module.exports = mongoose.model("Trigger", TriggerSchema);
