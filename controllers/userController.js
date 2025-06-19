const userService = require("../services/userService");

const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const result = await userService.createuser(userData);
    if (result.success) {
      return res.status(201).json({ message: result.message });
    } else {
      return res.status(400).json({ message: result.message });
    }
  } catch (error) {
    console.error("Error in createUser:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const query = req.query;
    const result = await userService.getuser(query);
    if (result.success) {
      return res.status(200).json(result.data);
    } else {
      return res.status(404).json({ message: result.message });
    }
  } catch (error) {
    console.error("Error in getUser:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createUser,
  getUser,
};
