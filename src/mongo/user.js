const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: { type: String, required: true },
  pageId: { type: String, required: true },
  username: String,
  eventTypes: [String],
  eventTopics: [String],
  savedEvents: [String],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
