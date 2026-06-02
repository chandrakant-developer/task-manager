const userService = require("../services/user.service");
const { ERRORS } = require("../constants");

exports.getUserProfile = async (req, res) => {
  try {
    const { id } = req.user;

    const response = await userService.getUserProfile(id);

    res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data: response
    });
  } catch (error) {
    if (error.message === ERRORS.USER_ERRORS.USER_NOT_FOUND) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: "Error fetching user profile",
      error: error.message
    });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const payload = req.body;

    const response = await userService.updateUserProfile(id, payload);

    res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      data: response
    });
  } catch (error) {
    if (error.message === ERRORS.USER_ERRORS.USER_NOT_FOUND) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: error.message
      });
    }

    if (error.message === ERRORS.USER_ERRORS.NO_FIELDS_TO_UPDATE) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update",
        error: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: "Error updating user profile",
      error: error.message
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { id } = req.user;
    const { currentPassword, newPassword } = req.body;

    await userService.changePassword(id, currentPassword, newPassword);

    res.status(200).json({
      success: true,
      message: "Password updated successfully"
    });
  } catch (error) {
    if (error.message === ERRORS.USER_ERRORS.USER_NOT_FOUND) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        error: error.message
      });
    }

    if (error.message === ERRORS.USER_ERRORS.SAME_PASSWORD) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from current password",
        error: error.message
      });
    }

    if (error.message === ERRORS.USER_ERRORS.WEAK_PASSWORD) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long",
        error: error.message
      });
    }

    if (error.message === ERRORS.USER_ERRORS.INVALID_CREDENTIALS) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
        error: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: "Error updating password",
      error: error.message
    });
  }
};

exports.getUserSessions = async (req, res) => {
  try {
    const { userId } = req.user;

    const response = await userService.getUserSessions(userId);

    res.status(200).json({
      success: true,
      message: "Sessions fetched successfully",
      data: response
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching sessions",
      error: error.message
    });
  }
};

exports.revokeSession = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    await userService.revokeSession(id, userId);

    res.status(200).json({
      success: true,
      message: "Session revoked successfully"
    });
  } catch (error) {
    if (error.message === ERRORS.USER_ERRORS.SESSION_NOT_FOUND) {
      return res.status(404).json({
        success: false,
        message: "Session not found",
        error: error.message
      });
    }

    if (error.message === ERRORS.USER_ERRORS.UNAUTHORIZED) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
        error: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: "Error revoking session",
      error: error.message
    });
  }
};