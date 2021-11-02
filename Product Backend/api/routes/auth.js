const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const validateSignUpRrquest = require("../middleware/validateSignUpRequest");

router.post("/signup", validateSignUpRrquest, authController.signup);
router.post("/login", authController.login);
router.post("/googleLogin", authController.googleLogin);
router.get("/getAllUsers", authController.getAllUsers);

module.exports = router;
