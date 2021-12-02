const express = require("express");
const router = express.Router();
const {
  getProfiles,
  addProfile,
  deleteProfile,
  updateProfile,
  getProfileId,
  getProfile,
} = require("../Controllers/ProfileController");
const auth = require("../middleware/auth.js");

router.route("/").get(getProfiles).post(addProfile);

router.route("/:id").delete(deleteProfile).patch(updateProfile).get(auth, getProfile);

router.route("/login").post(getProfileId);

module.exports = router;
