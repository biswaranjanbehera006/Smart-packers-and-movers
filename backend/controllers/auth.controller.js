const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const bcrypt = require("bcryptjs");
const sendMail = require("../utils/mail"); // your mail.js
const cloudinary = require("../utils/cloudinary"); // Cloudinary config

// Async handler wrapper
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// ✅ Send OTP via Email using mail.js
const sendOTPEmail = async (email, otp) => {
  const subject = "Your OTP Code - Smart Packers & Movers";
  const text = `Your OTP is ${otp}. It will expire in 5 minutes.`;
  const html = `<p>Hello,</p>
    <p>Your OTP is: <b>${otp}</b></p>
    <p>This OTP will expire in 5 minutes.</p>`;

  await sendMail({ to: email, subject, text, html });
};

// ================== REGISTER ==================
exports.register = asyncHandler(async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  if (await User.findOne({ email })) {
    return res.status(400).json({ success: false, message: "Email already exists" });
  }
  if (await User.findOne({ phone })) {
    return res.status(400).json({ success: false, message: "Phone already exists" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiry = Date.now() + 5 * 60 * 1000; // 5 min

  const user = await User.create({
    name,
    email,
    phone,
    password,
    role: role || "user",
    otp,
    otpExpiry,
    isVerified: false,
  });

  await sendOTPEmail(email, otp);

  res.status(201).json({
    success: true,
    message: "User registered. Please verify your email with the OTP sent.",
    userId: user._id,
  });
});

// ================== VERIFY OTP ==================
exports.verifyOTP = asyncHandler(async (req, res) => {
  const { userId, otp } = req.body;
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ success: false, message: "User not found" });

  if (user.isVerified) return res.status(400).json({ success: false, message: "User already verified" });

  if (user.otp !== otp || user.otpExpiry < Date.now()) {
    return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
  }

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();

  res.json({ success: true, message: "Email verified successfully" });
});

// ================== LOGIN ==================
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ success: false, message: "Invalid email or password" });

  if (!user.isVerified) return res.status(403).json({ success: false, message: "Please verify your email before logging in" });

  const isMatch = await user.matchPassword(password);
  if (!isMatch) return res.status(401).json({ success: false, message: "Invalid email or password" });

  if (user.isBlocked) return res.status(403).json({ success: false, message: "User is blocked by admin" });

  res.json({
    success: true,
    message: "Login successful",
    token: generateToken(user),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      profileImage: user.profileImage,
      address: user.address,
    },
  });
});

// ================== GET PROFILE ==================
exports.getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.userId).select("-password");
  if (!user) return res.status(404).json({ success: false, message: "User not found" });
  res.json({ success: true, user });
});

// ================== UPDATE PROFILE ==================
exports.updateProfile = asyncHandler(async (req, res) => {
  const { name, email, phone, password, address } = req.body;
  const user = await User.findById(req.user.userId);
  if (!user) return res.status(404).json({ success: false, message: "User not found" });

  if (name) user.name = name;

  // Check duplicate email
  if (email && email !== user.email) {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(400).json({ success: false, message: "Email already exists" });
    user.email = email;
  }

  // Check duplicate phone
  if (phone && phone !== user.phone) {
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) return res.status(400).json({ success: false, message: "Phone already exists" });
    user.phone = phone;
  }

  // Nested address update
  if (address) {
    user.address = {
      street: address.street || user.address?.street,
      city: address.city || user.address?.city,
      state: address.state || user.address?.state,
      postalCode: address.postalCode || user.address?.postalCode,
      country: address.country || user.address?.country || "India",
    };
  }

  // Password update
  if (password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
  }

  // Profile image upload
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "profile_pictures",
      width: 200,
      height: 200,
      crop: "fill",
    });
    user.profileImage = result.secure_url;
  }

  await user.save();

  res.json({
    success: true,
    message: "Profile updated successfully",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      address: user.address,
      profileImage: user.profileImage,
    },
  });
});
