// routes/auth.routes.js
const express = require("express");
const router = express.Router();

// Import controller functions
const {
  register,       // Function to handle user registration
  login,          // Function to handle login
  getProfile,     // Function to get user profile
  updateProfile,  // Function to update user profile
  verifyOTP       // Function to verify email OTP
} = require("../controllers/auth.controller");

// Import authentication middleware
const { protect } = require("../middleware/auth.middleware");

// Import multer upload middleware for profile images
const upload = require("../middleware/upload");

// ================== Public Routes ==================

// Register User (sends OTP email)
router.post("/register", register);

// Verify Email OTP
router.post("/verify-otp", verifyOTP);

// Login (only works after OTP verification)
router.post("/login", login);

// ================== Protected Routes ==================

// Get Profile
router.get("/profile", protect, getProfile);

// Update Profile with optional profile image upload
router.put("/profile", protect, upload.single("profileImage"), updateProfile);

module.exports = router;
