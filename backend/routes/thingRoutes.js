const express = require("express");
const router = express.Router();
const {
  createThing,
} = require("../controllers/thingController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
router.route("/create").post(isAuthenticatedUser, createThing);

module.exports = router;