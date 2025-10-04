const express = require("express");
const router = express.Router();

// Import controller functions
const {
  register,        // User registration (with email OTP)
  login,           // Login after verification
  getProfile,      // Get user profile
  updateProfile,   // Update profile
  verifyOTP,       // Verify email OTP
  forgotPassword,  // Send OTP for password reset
  resetPassword    // Reset password using OTP
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

// Forgot Password (send OTP to email)
router.post("/forgot-password", forgotPassword);

// Reset Password (verify OTP & set new password)
router.post("/reset-password", resetPassword);

// ================== Protected Routes ==================

// Get Profile
router.get("/profile", protect, getProfile);

// Update Profile with optional profile image upload
router.put("/profile", protect, upload.single("profileImage"), updateProfile);

module.exports = router;
