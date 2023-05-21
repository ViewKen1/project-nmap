const mongoose = require("mongoose");

const model1schema = mongoose.Schema({
  title: { type: String, required: true },
  output: { type: String, index: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("models1", model1schema);
