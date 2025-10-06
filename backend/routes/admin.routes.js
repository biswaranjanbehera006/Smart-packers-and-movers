const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/auth.middleware");

const {
  // User Management
  getAllUsers,
  blockUser,
  unblockUser,
  updateUserRole, // ✅ New controller for changing user role

  // Booking Management
  getAllBookings,
  approveBooking,
  declineBooking,
  deleteBooking,

  // Dashboard & Analytics
  getDashboardStats,
  getMonthlyRevenue,
  getMonthlyBookings,
  getRevenueByService,
} = require("../controllers/admin.controller");

// ================= USERS =================
router.get("/users", protect, adminOnly, getAllUsers);
router.put("/users/:id/block", protect, adminOnly, blockUser);
router.put("/users/:id/unblock", protect, adminOnly, unblockUser);

// ✅ Change user role (admin ↔ user only)
router.put("/users/:id/role", protect, adminOnly, updateUserRole);

// ================= BOOKINGS =================
router.get("/bookings", protect, adminOnly, getAllBookings);
router.put("/bookings/:id/approve", protect, adminOnly, approveBooking);
router.put("/bookings/:id/decline", protect, adminOnly, declineBooking);
router.delete("/bookings/:id", protect, adminOnly, deleteBooking);

// ================= DASHBOARD =================
router.get("/dashboard", protect, adminOnly, getDashboardStats);

// ================= ANALYTICS =================
router.get("/analytics/monthly-revenue", protect, adminOnly, getMonthlyRevenue);
router.get("/analytics/monthly-bookings", protect, adminOnly, getMonthlyBookings);
router.get("/analytics/revenue-by-service", protect, adminOnly, getRevenueByService);

module.exports = router;
