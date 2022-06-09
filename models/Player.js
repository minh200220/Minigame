const mongoose = require("mongoose");
const playerSchema = new mongoose.Schema({
  email: String,
  fullName: String,
  phone: String,
  paid: Boolean,
  wallet: String,
  date: Date,
});

module.exports = mongoose.model("Player", playerSchema);
