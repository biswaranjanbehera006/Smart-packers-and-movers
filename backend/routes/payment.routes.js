const express = require("express");
const router = express.Router();
const { protect, userOnly } = require("../middleware/auth.middleware");
const { createOrder, verifyPayment } = require("../controllers/payment.controller");

// ================= PAYMENTS =================
router.post("/create-order", protect, userOnly, createOrder);
router.post("/verify", protect, userOnly, verifyPayment);

module.exports = router;
