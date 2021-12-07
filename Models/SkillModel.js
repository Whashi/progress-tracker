const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  level: {
    type: Number,
    min: 0,
    max: 4,
    required: true,
    unique: true,
  },
  maxDataEntries: {
    type: Number,
    min: 0,
    required: true,
    unique: true,
  },
});
