// utils/cloudinary.js
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dwxsprktq",
  api_key: process.env.CLOUDINARY_API_KEY || "358419386271229",
  api_secret: process.env.CLOUDINARY_API_SECRET || "PC5vQE6mP1qP1GfHBj88DqFaTts",
  secure: true, // use HTTPS for uploaded images
});

module.exports = cloudinary;
