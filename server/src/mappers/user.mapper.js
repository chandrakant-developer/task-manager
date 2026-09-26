exports.mapUser = (user) => ({
  id: user._id,
  userId: user.userId,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role
});