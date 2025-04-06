import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "No token. Not authorized. Try logging in again.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("isAdmin email");

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "User not found. Try logging in again.",
      });
    }

    req.user = {
      email: user.email,
      isAdmin: user.isAdmin,
      userId: decoded.userId,
    };

    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({
      status: false,
      message: "Invalid token or session expired. Try logging in again.",
    });
  }
};

const isAdminRoute = (req, res, next) => {
  if (req.user?.isAdmin) {
    return next();
  }

  return res.status(403).json({
    status: false,
    message: "Access denied. Admins only.",
  });
};

export { protectRoute, isAdminRoute };
