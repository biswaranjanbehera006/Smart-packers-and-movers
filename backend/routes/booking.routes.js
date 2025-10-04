const express = require("express");
const router = express.Router();
const { protect, userOnly } = require("../middleware/auth.middleware");
const {
  createBooking,
  getUserBookings,
  cancelBooking,
} = require("../controllers/booking.controller");

// ================= USER BOOKINGS =================
router.post("/", protect, userOnly, createBooking);           // Create new booking
router.get("/my", protect, userOnly, getUserBookings);        // Get all bookings for logged-in user
router.put("/:id/cancel", protect, userOnly, cancelBooking);  // Cancel booking

module.exports = router;
