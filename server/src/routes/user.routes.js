const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { protect } = require("../middleware/auth.middleware");

router.use(protect);

router.get("/profile", userController.getUserProfile);

router.put("/profile", userController.updateUserProfile);

router.put("/password", userController.changePassword);

router.get("/sessions", userController.getUserSessions);

router.delete("/sessions/:id", userController.revokeSession);

module.exports = router;