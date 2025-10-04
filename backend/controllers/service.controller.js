const Service = require("../models/Service");
const cloudinary = require("../utils/cloudinary");

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// ================= SERVICES MANAGEMENT =================

// ✅ Add a new service
exports.addService = asyncHandler(async (req, res) => {
  const { name, description, basePrice } = req.body;

  if (await Service.findOne({ name })) {
    return res.status(400).json({ success: false, message: "Service already exists" });
  }

  let imageUrl = "";
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "services",
    });
    imageUrl = result.secure_url;
  }

  const service = await Service.create({
    name,
    description,
    basePrice,
    image: imageUrl,
  });

  res.status(201).json({ success: true, message: "Service added successfully", service });
});

// ✅ Get all services
exports.getAllServices = asyncHandler(async (req, res) => {
  const services = await Service.find().sort({ createdAt: -1 });
  res.json({ success: true, services });
});

// ✅ Update service
exports.updateService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, description, basePrice, isActive } = req.body;

  const service = await Service.findById(id);
  if (!service) return res.status(404).json({ success: false, message: "Service not found" });

  // Update fields
  if (name) service.name = name;
  if (description) service.description = description;
  if (basePrice) service.basePrice = basePrice;
  if (typeof isActive !== "undefined") service.isActive = isActive;

  // Update image if uploaded
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "services",
    });
    service.image = result.secure_url;
  }

  await service.save();
  res.json({ success: true, message: "Service updated successfully", service });
});

// ✅ Delete service
exports.deleteService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const service = await Service.findById(id);
  if (!service) return res.status(404).json({ success: false, message: "Service not found" });

  await service.deleteOne();
  res.json({ success: true, message: "Service deleted successfully" });
});
