const express = require("express");
const router = express.Router();
const { registerUser, loginUser, currentUser } = require("../controllers/userControllers");
const validateToken = require("../middlewares/validateTokenHandler");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/current").get(validateToken ,currentUser);

module.exports = router;