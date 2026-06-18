import jwt from "jsonwebtoken";
import User from "../Model/UserModel.js";

const isUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 1. Check token exists
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({
        message: "Not authorized, no token",
      });
    }

    const token = authHeader.split(" ")[1];

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Find user in DB
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    // 4. Normalize user object (IMPORTANT)
    req.user = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      gymId: user.gymId,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Not authorized, token failed",
      error: error.message,
    });
  }
};

export default isUser;