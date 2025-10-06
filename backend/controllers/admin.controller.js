const mongoose = require("mongoose");
const User = require("../models/User");
const Booking = require("../models/Booking");

// Async handler to simplify error handling
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

// ✅ Change user role (only between admin ↔ user)
exports.updateUserRole = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  // Allow only "admin" and "user"
  const allowedRoles = ["admin", "user"];
  if (!allowedRoles.includes(role)) {
    return res.status(400).json({
      success: false,
      message: `Invalid role. Only 'admin' and 'user' are allowed.`,
    });
  }

  const user = await User.findById(id);
  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });

  // Prevent self-demotion by main admin (optional safeguard)
  if (req.user.userId === user._id.toString() && role === "user") {
    return res.status(400).json({
      success: false,
      message: "You cannot remove your own admin access.",
    });
  }

  user.role = role;
  await user.save();

  res.json({
    success: true,
    message: `User role updated successfully to ${role}`,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
    },
  });
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

  res.json({ success: true, message: "Booking approved successfully", booking });
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

  res.json({ success: true, message: "Booking declined successfully", booking });
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

// ================= DASHBOARD & ANALYTICS =================

// ✅ Admin Dashboard Stats
exports.getDashboardStats = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalBookings = await Booking.countDocuments();

  const pendingBookings = await Booking.countDocuments({ status: "Pending" });
  const approvedBookings = await Booking.countDocuments({ status: "Approved" });
  const declinedBookings = await Booking.countDocuments({ status: "Declined" });

  const paidBookings = await Booking.find({ paymentStatus: "Paid" });
  const totalRevenue = paidBookings.reduce(
    (sum, booking) => sum + (booking.totalAmount || booking.price || 0),
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

// ✅ Helper: Get date filter for last N months
const buildLastNMonthsFilter = (field = "createdAt", months = 12) => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth() - (months - 1), 1);
  return { [field]: { $gte: start } };
};

// ✅ Monthly Revenue (default: last 12 months)
exports.getMonthlyRevenue = asyncHandler(async (req, res) => {
  const months = parseInt(req.query.months, 10) || 12;

  const match = {
    $match: {
      paymentStatus: "Paid",
      ...buildLastNMonthsFilter("updatedAt", months),
    },
  };

  const group = {
    $group: {
      _id: { year: { $year: "$updatedAt" }, month: { $month: "$updatedAt" } },
      totalRevenue: { $sum: { $ifNull: ["$totalAmount", "$price", 0] } },
    },
  };

  const project = {
    $project: {
      _id: 0,
      year: "$_id.year",
      month: "$_id.month",
      totalRevenue: 1,
    },
  };

  const sort = { $sort: { year: 1, month: 1 } };
  const data = await Booking.aggregate([match, group, project, sort]);

  res.json({ success: true, data });
});

// ✅ Monthly Bookings (default: last 12 months)
exports.getMonthlyBookings = asyncHandler(async (req, res) => {
  const months = parseInt(req.query.months, 10) || 12;

  const match = { $match: buildLastNMonthsFilter("createdAt", months) };
  const group = {
    $group: {
      _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
      count: { $sum: 1 },
    },
  };
  const project = {
    $project: { _id: 0, year: "$_id.year", month: "$_id.month", count: 1 },
  };
  const sort = { $sort: { year: 1, month: 1 } };

  const data = await Booking.aggregate([match, group, project, sort]);
  res.json({ success: true, data });
});

// ✅ Revenue by Service Type
exports.getRevenueByService = asyncHandler(async (req, res) => {
  const data = await Booking.aggregate([
    { $match: { paymentStatus: "Paid" } },
    {
      $group: {
        _id: "$serviceType",
        totalRevenue: { $sum: { $ifNull: ["$totalAmount", "$price", 0] } },
        totalBookings: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        serviceType: "$_id",
        totalRevenue: 1,
        totalBookings: 1,
      },
    },
    { $sort: { totalRevenue: -1 } },
  ]);

  res.json({ success: true, data });
});
