const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/auth.middleware");
const upload = require("../middlewares/upload");
const {
  createService,
  getAllServices,
  updateService,
  deleteService,
} = require("../controllers/service.controller");

// ================= SERVICES =================
router.post("/", protect, adminOnly, upload.single("image"), createService);
router.get("/", protect, adminOnly, getAllServices);
router.put("/:id", protect, adminOnly, upload.single("image"), updateService);
router.delete("/:id", protect, adminOnly, deleteService);

module.exports = router;
