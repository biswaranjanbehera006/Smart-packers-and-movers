const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // no duplicate service names
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    basePrice: {
      type: Number,
      required: true,
    },
    image: {
      type: String, // Cloudinary image URL
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
