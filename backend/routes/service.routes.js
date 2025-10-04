const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/auth.middleware");
const upload = require("../middlewares/upload"); // for Cloudinary image upload
const {
  addService,
  getAllServices,
  updateService,
  deleteService,
} = require("../controllers/service.controller");

// ================= SERVICES =================
router.post("/", protect, adminOnly, upload.single("image"), addService);
router.get("/", protect, adminOnly, getAllServices);
router.put("/:id", protect, adminOnly, upload.single("image"), updateService);
router.delete("/:id", protect, adminOnly, deleteService);

module.exports = router;
