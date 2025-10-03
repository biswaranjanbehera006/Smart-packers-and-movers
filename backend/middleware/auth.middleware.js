const jwt = require("jsonwebtoken");

// Protect routes
const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = {
        userId: decoded.userId, // ✅ matches generateToken
        role: decoded.role,
      };

      return next();
    } catch (error) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, token invalid" });
    }
  }

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, token missing" });
  }
};

// Admin only
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") return next();
  return res
    .status(403)
    .json({ success: false, message: "Access denied, Admins only" });
};

// Mover only
const moverOnly = (req, res, next) => {
  if (req.user && req.user.role === "mover") return next();
  return res
    .status(403)
    .json({ success: false, message: "Access denied, Movers only" });
};

// User only
const userOnly = (req, res, next) => {
  if (req.user && req.user.role === "user") return next();
  return res
    .status(403)
    .json({ success: false, message: "Access denied, Users only" });
};

module.exports = { protect, adminOnly, moverOnly, userOnly };
