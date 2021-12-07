const mongoose = require("mongoose");
const User = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getUsers = async (req, res) => {
  try {
    const userData = await User.find();
    return res.status(200).json({
      success: true,
      data: userData,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

exports.getUserId = async (req, res) => {
  try {
    await User.findOne({ name: req.body.name }, (err, docs) => {
      if (!docs) {
        return res.status(404).json({
          success: false,
          msg: "User Not Found",
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
                authLevel: docs.authorization,
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

exports.getUser = async (req, res) => {
    try {
      const userData = await User.findById(req.params.id);
      if (!userData) {
        return res.status(404).json({
          success: false,
          msg: "User Not Found",
        });
      }
      return res.status(200).json({
        success: true,
        data: userData,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        msg: "Server Error",
      });
    }
  };

  exports.addUser = async (req, res) => {
    try {
      let newUserInput = {
        name: req.body.name,
        password: req.body.password,
        authorization: req.body.authorization,
      };
      await bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUserInput.password, salt, (err, hash) => {
          newUserInput = { ...newUserInput, password: hash };
          User.create(newUserInput);
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

  exports.deleteUser = async (req, res) => {
    try {
      const userData = User.findById(req.params.id);
      if (!userData) {
        return res.status(404).json({
          success: false,
          msg: "User Not Found",
        });
      }
      await userData.remove();
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

  exports.updateUser = async (req, res) => {
    const { id: _id } = req.params;
    const user = req.body;
    try {
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({
          success: false,
          msg: "User Not Found",
        });
      }
  
      const updatedUser = await User.findByIdAndUpdate(_id, user, {
        new: true,
      });
  
      return res.status(200).json({
        success: true,
        data: updatedUser,
      });
    } catch (err) {
      return res.status(500).json({
        success: false,
        msg: "Server Error",
      });
    }
  };
  