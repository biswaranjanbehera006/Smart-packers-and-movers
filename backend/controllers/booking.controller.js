const Booking = require("../models/Booking");
const Service = require("../models/Service");
const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// ================= USER BOOKINGS =================

// ✅ Create a new booking
exports.createBooking = asyncHandler(async (req, res) => {
  const { serviceType, pickupAddress, dropAddress, movingDate, price, notes } = req.body;

  if (!serviceType || !pickupAddress || !dropAddress || !movingDate || !price) {
    return res.status(400).json({ success: false, message: "All required fields must be filled" });
  }

  const booking = await Booking.create({
    user: req.user.userId,
    serviceType,
    pickupAddress,
    dropAddress,
    movingDate,
    price,
    notes,
  });

  res.status(201).json({ success: true, message: "Booking created successfully", booking });
});

// ✅ Get all bookings for a specific user
exports.getUserBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user.userId }).sort({ createdAt: -1 });
  res.json({ success: true, bookings });
});

// ✅ Cancel booking (only if status is Pending)
exports.cancelBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findById(id);

  if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

  if (booking.user.toString() !== req.user.userId) {
    return res.status(403).json({ success: false, message: "You are not authorized to cancel this booking" });
  }

  if (booking.status !== "Pending") {
    return res.status(400).json({ success: false, message: "Booking cannot be cancelled once processed" });
  }

  booking.status = "Cancelled";
  await booking.save();

  res.json({ success: true, message: "Booking cancelled successfully" });
});
