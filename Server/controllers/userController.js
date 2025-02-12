const userModel = require("../models/authenticateModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");
require("dotenv").config();

const jwtToken = (id) => {
  return jwt.sign({ id }, process.env.VITE_JWT_SECRET, { expiresIn: "24h" });
};

//Storing user info to db via signup
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body.email,req.body.username,req.body.password)

  try {
    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return res.json({
        success: false,
        message: "User with email already exists",
      });
    }

    //Validating email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter valid email format",
      });
    }

    if (password.length <= 8) {
      return res.json({
        success: false,
        message: "Please enter 8 digit strong password",
      });
    }

    //Salting and hashing of password
    const salt = await bcrypt.genSalt(10);
    const hashing = await bcrypt.hash(password, salt);

    //Storing new user to db
    const newUser = new userModel({
      username: username,
      email: email,
      password: hashing,
    });

    const user = await newUser.save();

    const token = jwtToken(user._id);
    // Send token in an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "development" ? "None" : "Strict",
      secure: process.env.VITE_NODE_ENV === "development",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
      success: true,
      token,
      user: { _id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error while registrating new user" });
  }
};

//Login user function
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User does not exist" });
    }

    const matchCredits = await bcrypt.compare(password, user.password);
    if (!matchCredits) {
      return res.status(401).json({
        success: false,
        message: "Either email or password invalid",
      });
    }

    const token = jwtToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "development" ? "None" : "Strict",
      secure: process.env.NODE_ENV === "development",
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    });

    return res.status(200).json({
      success: true,
      token,
      user: { _id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error while logging user" });
  }
};


//Log out user function
const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "development" ? "None" : "Strict",
    secure: process.env.VITE_NODE_ENV === "development",
  });
  res.json({ success: true, message: "Logged out successfully" });
};

//Verifying user there or not
const verifyUser = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.VITE_JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    const userInDB = await userModel.findOne({ userId: user._id });
    const isUserThere = !!userInDB;

    res.status(200).json({ success: true, user,isUserThere });
  } catch (error) {
    console.error("Verification Error:", error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

module.exports = { loginUser, registerUser, logoutUser, verifyUser };
