const userService = require("../services/user.service");

exports.getUser = async (req, res) => {
  try {
    const user = await userService.getUser(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching user",
      error: error.message
    });
  }
};