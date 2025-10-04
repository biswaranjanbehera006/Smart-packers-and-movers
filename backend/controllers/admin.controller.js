const User = require("../models/User");
const Booking = require("../models/Booking");

// Async handler to avoid repetitive try-catch
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// ================= USERS MANAGEMENT =================

// ✅ Get all users
exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.json({ success: true, users });
});

// ✅ Block user
exports.blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });

  user.isBlocked = true;
  await user.save();
  res.json({ success: true, message: "User blocked successfully" });
});

// ✅ Unblock user
exports.unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });

  user.isBlocked = false;
  await user.save();
  res.json({ success: true, message: "User unblocked successfully" });
});

// ================= BOOKINGS MANAGEMENT =================

// ✅ Get all bookings
exports.getAllBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find()
    .populate("user", "name email phone")
    .sort({ createdAt: -1 });

  res.json({ success: true, bookings });
});

// ✅ Approve booking
exports.approveBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findById(id);
  if (!booking)
    return res
      .status(404)
      .json({ success: false, message: "Booking not found" });

  booking.status = "Approved";
  await booking.save();

  res.json({ success: true, message: "Booking approved successfully" });
});

// ✅ Decline booking
exports.declineBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findById(id);
  if (!booking)
    return res
      .status(404)
      .json({ success: false, message: "Booking not found" });

  booking.status = "Declined";
  await booking.save();

  res.json({ success: true, message: "Booking declined successfully" });
});

// ✅ Delete booking
exports.deleteBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findById(id);
  if (!booking)
    return res
      .status(404)
      .json({ success: false, message: "Booking not found" });

  await booking.deleteOne();
  res.json({ success: true, message: "Booking deleted successfully" });
});



// ✅ Admin Dashboard Stats
exports.getDashboardStats = asyncHandler(async (req, res) => {
  // Count total users and bookings
  const totalUsers = await User.countDocuments();
  const totalBookings = await Booking.countDocuments();

  // Count by booking status
  const pendingBookings = await Booking.countDocuments({ status: "Pending" });
  const approvedBookings = await Booking.countDocuments({ status: "Approved" });
  const declinedBookings = await Booking.countDocuments({ status: "Declined" });

  // Calculate total revenue (from paid bookings)
  const paidBookings = await Booking.find({ paymentStatus: "Paid" });
  const totalRevenue = paidBookings.reduce(
    (sum, booking) => sum + (booking.totalAmount || 0),
    0
  );

  res.json({
    success: true,
    stats: {
      totalUsers,
      totalBookings,
      totalRevenue,
      pendingBookings,
      approvedBookings,
      declinedBookings,
    },
  });
});
