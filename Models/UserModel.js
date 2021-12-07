const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    default: "Apprentice Level 1",
  },
  authorization: {
    type: Number,
    default: 0,
  },
  skills: {
    type: [Object]
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
