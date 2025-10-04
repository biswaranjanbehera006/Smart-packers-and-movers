const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/auth.middleware");
const {
  // User Management
  getAllUsers,
  blockUser,
  unblockUser,

  // Booking Management
  getAllBookings,
  approveBooking,
  declineBooking,
  deleteBooking,
   getDashboardStats,
} = require("../controllers/admin.controller");

// ================= USERS =================
router.get("/users", protect, adminOnly, getAllUsers);
router.put("/users/:id/block", protect, adminOnly, blockUser);
router.put("/users/:id/unblock", protect, adminOnly, unblockUser);

// ================= BOOKINGS =================
router.get("/bookings", protect, adminOnly, getAllBookings);
router.put("/bookings/:id/approve", protect, adminOnly, approveBooking);
router.put("/bookings/:id/decline", protect, adminOnly, declineBooking);
router.delete("/bookings/:id", protect, adminOnly, deleteBooking);

router.get("/dashboard", protect, adminOnly, getDashboardStats);

module.exports = router;
