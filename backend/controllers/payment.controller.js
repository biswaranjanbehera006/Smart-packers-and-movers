const Razorpay = require("razorpay");
const crypto = require("crypto");
const Booking = require("../models/Booking");

// ✅ Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Helper to wrap async functions
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// ================= PAYMENTS =================

// ✅ Create payment order
exports.createOrder = asyncHandler(async (req, res) => {
  const { bookingId, amount, currency = "INR" } = req.body;

  if (!bookingId || !amount)
    return res.status(400).json({ success: false, message: "Booking ID and amount are required" });

  const options = {
    amount: amount * 100, // Amount in paise
    currency,
    receipt: `receipt_${bookingId}`,
  };

  const order = await razorpay.orders.create(options);
  res.status(200).json({
    success: true,
    order,
    key: process.env.RAZORPAY_KEY_ID,
  });
});

// ✅ Verify payment after success on frontend
exports.verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !bookingId) {
    return res.status(400).json({ success: false, message: "Missing payment details" });
  }

  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign.toString())
    .digest("hex");

  if (razorpay_signature !== expectedSign) {
    return res.status(400).json({ success: false, message: "Payment verification failed" });
  }

  // Update booking payment status
  const booking = await Booking.findById(bookingId);
  if (!booking)
    return res.status(404).json({ success: false, message: "Booking not found" });

  booking.paymentStatus = "Paid";
  booking.status = "Approved";
  await booking.save();

  res.json({ success: true, message: "Payment verified successfully", booking });
});
