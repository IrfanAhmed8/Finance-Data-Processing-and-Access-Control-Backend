import User from '../models/userModel.js';

export const createUser = async (req, res) => {
  try {
    const { name, email, role, status } = req.body;
    if (!name || !email) {
      return res.status(400).json({
        message: "Name and email are required"
      });
    }
    
    const validRoles = ["admin", "analyst", "viewer"];
    if (role && !validRoles.includes(role)) {
      return res.status(400).json({
        message: "Invalid role"
      });
    }

    
    const validStatus = ["active", "inactive"];
    if (status && !validStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status"
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email"
      });
    }

    
    const user = await User.create({
      name,
      email,
      role: role || "viewer",
      status: status || "active"
    });

    res.status(201).json(user);

  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal Server Error"
    });
  }
};