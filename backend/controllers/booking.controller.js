const Booking = require("../models/Booking");
const User = require("../models/User");
const sendMail = require("../utils/mail");
const generateInvoicePDF = require("../utils/generateInvoicePDF"); // 📄 PDF utility

// Async handler to avoid try/catch everywhere
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// ================= USER BOOKINGS =================

// ✅ Create a new booking (with PDF invoice + email to user & admin)
exports.createBooking = asyncHandler(async (req, res) => {
  const { serviceType, pickupAddress, dropAddress, movingDate, price, notes } = req.body;

  // Validate required fields
  if (!serviceType || !pickupAddress || !dropAddress || !movingDate || !price) {
    return res
      .status(400)
      .json({ success: false, message: "All required fields must be filled" });
  }

  // Create new booking
  const booking = await Booking.create({
    user: req.user.userId,
    serviceType,
    pickupAddress,
    dropAddress,
    movingDate,
    price,
    notes,
    status: "Pending",
    paymentStatus: "Paid", // (adjust if using payment gateway later)
  });

  // Fetch user for email
  const user = await User.findById(req.user.userId);

  // ✅ Generate Invoice PDF
  const pdfPath = await generateInvoicePDF(booking, user);

  // ✅ 1️⃣ Send Email to User
  const userSubject = "Booking Confirmed - Smart Packers & Movers";
  const userHtml = `
    <h3>Dear ${user.name},</h3>
    <p>Your booking has been successfully created!</p>
    <p><strong>Booking ID:</strong> ${booking._id}</p>
    <p><strong>Service:</strong> ${booking.serviceType}</p>
    <p><strong>Status:</strong> ${booking.status}</p>
    <p>Thank you for trusting Smart Packers & Movers.</p>
    <p>We’ve attached your booking invoice below.</p>
    <br>
    <p>Best Regards,<br>Smart Packers & Movers Team</p>
  `;

  await sendMail({
    to: user.email,
    subject: userSubject,
    html: userHtml,
    attachments: [
      {
        filename: `Invoice_${booking._id}.pdf`,
        path: pdfPath,
      },
    ],
  });

  // ✅ 2️⃣ Send Notification Email to Admin
  const adminEmail = process.env.ADMIN_EMAIL || "youradminemail@gmail.com"; // set in .env
  const adminSubject = `📦 New Booking Received - ${user.name}`;
  const adminHtml = `
    <h2>New Booking Received</h2>
    <p><strong>Customer:</strong> ${user.name}</p>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Phone:</strong> ${user.phone}</p>
    <hr>
    <p><strong>Service:</strong> ${booking.serviceType}</p>
    <p><strong>Pickup:</strong> ${booking.pickupAddress}</p>
    <p><strong>Drop:</strong> ${booking.dropAddress}</p>
    <p><strong>Moving Date:</strong> ${booking.movingDate}</p>
    <p><strong>Price:</strong> ₹${booking.price}</p>
    <hr>
    <p><strong>Status:</strong> ${booking.status}</p>
    <p><strong>Notes:</strong> ${booking.notes || "N/A"}</p>
    <br>
    <p>Invoice attached for reference.</p>
  `;

  await sendMail({
    to: adminEmail,
    subject: adminSubject,
    html: adminHtml,
    attachments: [
      {
        filename: `Invoice_${booking._id}.pdf`,
        path: pdfPath,
      },
    ],
  });

  res
    .status(201)
    .json({
      success: true,
      message:
        "Booking created successfully. Confirmation email sent to user and admin notified.",
      booking,
    });
});

// ✅ Get all bookings for a specific user
exports.getUserBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user.userId }).sort({
    createdAt: -1,
  });
  res.json({ success: true, bookings });
});

// ✅ Cancel booking (only if status is Pending)
exports.cancelBooking = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const booking = await Booking.findById(id);

  if (!booking)
    return res
      .status(404)
      .json({ success: false, message: "Booking not found" });

  if (booking.user.toString() !== req.user.userId) {
    return res
      .status(403)
      .json({
        success: false,
        message: "You are not authorized to cancel this booking",
      });
  }

  if (booking.status !== "Pending") {
    return res
      .status(400)
      .json({
        success: false,
        message: "Booking cannot be cancelled once processed",
      });
  }

  booking.status = "Cancelled";
  await booking.save();

  res.json({ success: true, message: "Booking cancelled successfully" });
});
