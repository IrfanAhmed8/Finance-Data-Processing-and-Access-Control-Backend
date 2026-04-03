import User from "../models/userModel.js";

export const mockAuth = async (req, res, next) => {
  try {
    const userId = req.headers["user-id"];

    if (!userId) {
      return res.status(401).json({ message: "User ID required in headers" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};