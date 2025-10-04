const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceType: {
      type: String,
      required: true,
      enum: ["House Shifting", "Office Relocation", "Vehicle Transport", "Storage"],
    },
    pickupAddress: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: { type: String, default: "India" },
    },
    dropAddress: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: { type: String, default: "India" },
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    movingDate: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Declined", "Cancelled", "Completed"],
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },
    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
