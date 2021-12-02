const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
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
  skillsAprenticeLevel1: {
    type: [Object],
    default: [
      {
        name: "Fascia Level 1",
        level: 0,
        dataEntries: 0,
        maxDataEntries: 5,
      },
      {
        name: "Backroll Stucco Level 1",
        level: 0,
        dataEntries: 0,
        maxDataEntries: 1,
      },
      {
        name: "Roll Interior Walls Level 1",
        level: 0,
        dataEntries: 0,
        maxDataEntries: 5,
      },
      {
        name: "Ladder Moves Level 1",
        level: 0,
        dataEntries: 0,
        maxDataEntries: 1,
      },
      {
        name: "Grinders Level 1",
        level: 0,
        dataEntries: 0,
        maxDataEntries: 1,
      },
    ],
  },
  skillsAprenticeLevel2: {
    type: [Object],
    default: [
      {
        name: "Fascia Level 2",
        level: 1,
        dataEntries: 0,
        maxDataEntries: 5,
      },
      {
        name: "Backroll Stucco Level 2",
        level: 1,
        dataEntries: 0,
        maxDataEntries: 1,
      },
      {
        name: "Roll Interior Walls Level 2",
        level: 1,
        dataEntries: 0,
        maxDataEntries: 5,
      },
      {
        name: "Ladder Moves Level 2",
        level: 1,
        dataEntries: 0,
        maxDataEntries: 1,
      },
      {
        name: "Grinders Level 2",
        level: 1,
        dataEntries: 0,
        maxDataEntries: 1,
      },
      {
        name: "Masking",
        level: 1,
        dataEntries: 0,
        maxDataEntries: 5,
      },
      {
        name: "Pressure Washing",
        level: 1,
        dataEntries: 0,
        maxDataEntries: 1,
      },
      {
        name: "Installing Light Fixures",
        level: 1,
        dataEntries: 0,
        maxDataEntries: 1,
      },
    ],
  },

  skillsJourneymanLevel1: {
    type: [Object],
    default: [
      {
        name: "Painting Doors",
        level: 2,
        dataEntries: 0,
        maxDataEntries: 5,
      },
      {
        name: "Spackle",
        level: 2,
        dataEntries: 0,
        maxDataEntries: 1,
      },
      {
        name: "Clean Airless Sprayer",
        level: 2,
        dataEntries: 0,
        maxDataEntries: 1,
      },
      {
        name: "Spray with Backroll or Backbrush",
        level: 2,
        dataEntries: 0,
        maxDataEntries: 1,
      },
      {
        name: "Caulk Exterior Windows",
        level: 2,
        dataEntries: 0,
        maxDataEntries: 1,
      },
    ],
  },
  skillsJourneymanLevel2: {
    type: [Object],
    default: [
      {
        name: "Cut Walls",
        level: 3,
        dataEntries: 0,
        maxDataEntries: 5,
      },
      {
        name: "Varnish Doors",
        level: 3,
        dataEntries: 0,
        maxDataEntries: 5,
      },
      {
        name: "Spray without Backroll or Backbrush",
        level: 3,
        dataEntries: 0,
        maxDataEntries: 1,
      },
      {
        name: "Set Up Shop",
        level: 3,
        dataEntries: 0,
        maxDataEntries: 1,
      },
      {
        name: "Fat Bead Caulk",
        level: 3,
        dataEntries: 0,
        maxDataEntries: 1,
      },
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Profile", ProfileSchema);
