const express = require("express");
const router = express.Router();
const {
  createChannel,
} = require("../controllers/channelController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
router.route("/create").post(isAuthenticatedUser, createChannel);

module.exports = router;