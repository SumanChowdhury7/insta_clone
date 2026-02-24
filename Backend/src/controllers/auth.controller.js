const express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const authController = {
  registerController: async (req, res) => {
    const { username, email, password, bio, profileImage } = req.body;

    const existedUser = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existedUser) {
      return res.status(409).json({
        error:
          existedUser.email === email
            ? "Email already exist"
            : "Username already exist",
      });
    }

    const user = await userModel.create({
      username,
      email,
      password: await bcrypt.hash(password, 10),
      bio,
      profileImage,
    });
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.cookie("token", token,{
        httpOnly: true,
      sameSite: "none",
      secure: false,
    });

    res.status(201).json({
      message: "registration sucessfull",
      user: {
        email: user.email,
        username: user.username,
        bio: user.bio,
      },
      token,
    });
  },
  loginController: async (req, res) => {
    const { email, username, password } = req.body;
    const user = await userModel
      .findOne({
        $or: [
          {
            email: email,
          },
          {
            username: username,
          },
        ],
      })
      .select("+password");

    if (!user) {
      return res.status(400).json({
        message: "User not found!",
      });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid password!",
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: false,
    });

    res.status(200).json({
      message: "Logged in sucessfully.",
      user
    });
  },

  getMeController: async (req, res) => {
    const userId = req.user.id;

    const user = await userModel.findById(userId);

    res.status(200).json({
      message: "Fetched sucessfully",
      user: {
        username: user.username,
        email: user.email,
        bio: user.bio,
        profileImage: user.profileImage,
      },
    });
  },
};
module.exports = authController;
