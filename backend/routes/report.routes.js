const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/auth.middleware");
const {
  exportBookingsCSV_Admin,
  exportBookingsPDF_Admin,
  exportBookingsCSV_User,
  exportBookingsPDF_User,
} = require("../controllers/report.controller");

// ========== ADMIN REPORTS ==========
router.get("/admin/bookings/csv", protect, adminOnly, exportBookingsCSV_Admin);
router.get("/admin/bookings/pdf", protect, adminOnly, exportBookingsPDF_Admin);

// ========== USER REPORTS ==========
router.get("/user/bookings/csv", protect, exportBookingsCSV_User);
router.get("/user/bookings/pdf", protect, exportBookingsPDF_User);

module.exports = router;
