const mongoose = require("mongoose");
const Profile = require("../Models/ProfileModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getProfiles = async (req, res) => {
  try {
    const profileData = await Profile.find();
    return res.status(200).json({
      success: true,
      count: profileData.length,
      data: profileData,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getProfileId = async (req, res) => {
  try {
    await Profile.findOne({ name: req.body.name }, (err, docs) => {
      if (!docs) {
        return res.status(404).json({
          success: false,
          msg: "Profile Not Found",
        });
      }
      bcrypt.compare(req.body.password, docs.password, (err, match) => {
        if (match) {
          jwt.sign(
            { id: docs.id },
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) {
                throw err;
              }
              return res.status(200).json({
                token,
                success: true,
                id: docs._id,
                authLevel: docs.authorization
              });
            }
          );
        } else {
          return res.status(400).json({
            success: false,
            msg: "Wrong Password",
          });
        }
      });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const profileData = await Profile.findById(req.params.id);
    if (!profileData) {
      return res.status(404).json({
        success: false,
        msg: "Profile Not Found",
      });
    }
    return res.status(200).json({
      success: true,
      data: profileData,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};

exports.addProfile = async (req, res) => {
  try {
    let newUserInput = {
      name: req.body.name,
      password: req.body.password,
      authorization: req.body.authorization,
    };
    await bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUserInput.password, salt, (err, hash) => {
        newUserInput = { ...newUserInput, password: hash };
        Profile.create(newUserInput);
        return res.status(200).json({
          success: true,
          data: newUserInput,
        });
      });
    });
  } catch (err) {
    if (err.name === "Validation Error") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        msg: messages,
      });
    } else {
      res.status(500).json({
        success: false,
        msg: err,
      });
    }
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const profileData = Profile.findById(req.params.id);
    if (!profileData) {
      return res.status(404).json({
        success: false,
        msg: "Profile Not Found",
      });
    }
    await profileData.remove();
    return res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};

exports.updateProfile = async (req, res) => {
  const { id: _id } = req.params;
  const profile = req.body;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).json({
        success: false,
        msg: "Profile Not Found",
      });
    }

    const updatedProfile = await Profile.findByIdAndUpdate(_id, profile, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      data: updatedProfile,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      msg: "Server Error",
    });
  }
};
