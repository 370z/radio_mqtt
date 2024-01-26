const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { ErrorHandler } = require("./errorHandlers");

exports.isAuthenticatedUser = async (req, res, next) => {
  const bearerHeader = req.header("authorization") || req.header("Authorization") ;
  // const { token } = req.cookies;
  if (!bearerHeader) {
    return next(new ErrorHandler("Login first to access this resource.", 401));
  }
  const bearer = bearerHeader.split(" ");
  const token = bearer[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid token", 401));
  }
};


// Handling user roles
exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    console.log(req.user.roles)
    if (!roles.includes(req.user.roles)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.roles}) is not allowed to access this resource.`,
          403
        )
      );
    }
    next();
  };
};