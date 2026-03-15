const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

async function seedUsers() {
  try {
    const existingAdmin = await User.findOne({ email: ADMIN_EMAIL });

    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    await User.create({
      name: "Admin",
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
      isVerified: true
    });

    console.log("Admin user created successfully");
  } catch (error) {
    console.error("Error seeding admin user:", error.message);
  }
}

module.exports = seedUsers;