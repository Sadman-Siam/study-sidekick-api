const user = require("../models/users");

async function createuser(data) {
  try {
    const user = new user(data);
    await user.save();
    console.log("User created successfully:", user);
    return { success: true, message: "user created successfully" };
  } catch (error) {
    console.error("Error creating user:", error);
    return { success: false, message: "failed to create user" };
  }
}

async function getuser(query = {}) {
  try {
    const users = await user.find(query);
    if (users.length === 0 || !users) {
      console.log("No users found");
      return { success: false, message: "No users found" };
    }
    return { success: true, data: users };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { success: false, message: "Error fetching users" };
  }
}

module.exports = {
  createuser,
  getuser,
};
