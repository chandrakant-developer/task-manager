const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { protect } = require("../middleware/auth.middleware");

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

router.post("/refresh", authController.refreshToken);

router.post("/logout", authController.logoutUser);

router.put("/password", protect, authController.changePassword);

module.exports = router;