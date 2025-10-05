const Service = require("../models/Service");
const cloudinary = require("../utils/cloudinary");

// Async wrapper
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// ✅ Create a new service
exports.createService = asyncHandler(async (req, res) => {
  const { title, description, price, category } = req.body;

  if (!req.file) {
    return res.status(400).json({ success: false, message: "Image is required" });
  }

  // Upload image to Cloudinary
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "services",
  });

  const service = await Service.create({
    title,
    description,
    price,
    category,
    image: result.secure_url,
  });

  res.status(201).json({
    success: true,
    message: "Service created successfully",
    service,
  });
});

// ✅ Get all services
exports.getAllServices = asyncHandler(async (req, res) => {
  const services = await Service.find().sort({ createdAt: -1 });
  res.json({ success: true, services });
});

// ✅ Update service
exports.updateService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, price, category, isActive } = req.body;

  const service = await Service.findById(id);
  if (!service)
    return res.status(404).json({ success: false, message: "Service not found" });

  // If a new image is uploaded, replace it
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "services",
    });
    service.image = result.secure_url;
  }

  if (title) service.title = title;
  if (description) service.description = description;
  if (price) service.price = price;
  if (category) service.category = category;
  if (isActive !== undefined) service.isActive = isActive;

  await service.save();

  res.json({
    success: true,
    message: "Service updated successfully",
    service,
  });
});

// ✅ Delete service
exports.deleteService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const service = await Service.findById(id);
  if (!service)
    return res.status(404).json({ success: false, message: "Service not found" });

  await service.deleteOne();
  res.json({ success: true, message: "Service deleted successfully" });
});
