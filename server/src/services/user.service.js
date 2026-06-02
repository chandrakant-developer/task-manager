const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const Session = require("../models/session.model");
const { mapUser } = require("../mappers/user.mapper");
const { SALT_ROUNDS } = require("../config/auth.config");
const { ERRORS } = require("../constants");

exports.getUserProfile = async (id) => {
  const user = await User.findById(id).select("-password").lean();

  if (!user) {
    throw new Error(ERRORS.USER_ERRORS.USER_NOT_FOUND);
  }

  return mapUser(user);
};

exports.updateUserProfile = async (id, data) => {
  const allowedFields = ["name", "phone"];
  const updates = {};

  allowedFields.forEach((field) => {
    if (data[field] !== undefined) {
      updates[field] = data[field];
    }
  });

  if (Object.keys(updates).length === 0) {
    throw new Error(ERRORS.USER_ERRORS.NO_FIELDS_TO_UPDATE);
  }

  const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true }).select("-password").lean();

  if (!updatedUser) {
    throw new Error(ERRORS.USER_ERRORS.USER_NOT_FOUND);
  }

  return mapUser(updatedUser);
};

exports.changePassword = async (id, currentPassword, newPassword) => {
  const user = await User.findById(id);

  if (!user) {
    throw new Error(ERRORS.USER_ERRORS.USER_NOT_FOUND);
  }

  if(currentPassword === newPassword) {
    throw new Error(ERRORS.USER_ERRORS.SAME_PASSWORD);
  }

  if (newPassword.length < 8) {
    throw new Error(ERRORS.USER_ERRORS.WEAK_PASSWORD);
  }

  const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

  if (!isPasswordValid) {
    throw new Error(ERRORS.USER_ERRORS.INVALID_CREDENTIALS);
  }

  const hashedPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);

  user.password = hashedPassword;

  await user.save();

  return true;
};

exports.getUserSessions = async (userId) => {
  return await Session.find({ userId }).select("_id device ipAddress createdAt").lean();
};

exports.revokeSession = async (id, userId) => {
  const session = await Session.findById(id);
  
  if (!session) {
    throw new Error(ERRORS.USER_ERRORS.SESSION_NOT_FOUND);
  }

  if (Number(session.userId) !== Number(userId)) {
    throw new Error(ERRORS.USER_ERRORS.UNAUTHORIZED);
  }

  await Session.findByIdAndDelete(id);
};