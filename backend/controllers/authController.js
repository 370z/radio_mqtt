const User = require("../models/user");
const sendToken = require("../utils/jwtToken");
const { ErrorHandler } = require("../middlewares/errorHandlers");
const crypto = require("crypto");

// Register a new user
exports.register = async (req, res, next) => {

  try {
    const { username, password } = req.body;

    const user = await User.create({
      username,
      password
    });

    sendToken(user, 200, res);
  } catch (error) {
    // console.error(error);
    if (error.name === 'SequelizeUniqueConstraintError' && error.fields.username) {
      return res.status(400).json({ error: 'Username is already in use.' });
    }
    return next(error);
  }
};

// Login user
exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid password", 401));
    }

    sendToken(user, 200, res);
    // res.json({ message: 'Login successful', user });
  } catch (error) {
    // Use the error handling middleware to handle the error
    return next(error);
  }
};

// user profile
exports.getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(error);
  }
};


// Logout user => /api/v1/logout
exports.logout = async (req, res, next) => {
  res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true });
  res.status(200).json({
    success: true,
    message: "Logged out",
  });
};

// Admin Routes

// Get all users   =>   /api/v1/admin/users
exports.allUsers = async (req, res, next) => {
  const users = await User.findAll({
    attributes: {
      exclude: ['password'],
    },
  });

  res.status(200).json({
    success: true,
    users,
  });
};
