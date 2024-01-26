const express = require("express");
const router = express.Router();
const {
  createKey,
} = require("../controllers/accessKeyController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");
router.route("/create").post(createKey);

module.exports = router;