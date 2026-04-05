const User = require("../models/user.model");

exports.getUser = async (id) => {
  const user = await User.findById(id).select("-password");

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  return {
    id: user._id,
    userId: user.userId,
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone
  };
};