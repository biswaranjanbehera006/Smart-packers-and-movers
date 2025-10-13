# 🚚 Smart Packers & Movers

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge)](#)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-blue?style=for-the-badge&logo=node.js)](#)
[![React](https://img.shields.io/badge/Frontend-React.js-61DAFB?style=for-the-badge&logo=react)](#)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-4EA94B?style=for-the-badge&logo=mongodb)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](#)
[![Nodemailer](https://img.shields.io/badge/Email-Nodemailer-orange?style=for-the-badge)](#)

> 🌍 **Smart Packers & Movers** is a full-stack MERN application that allows users to book professional moving services online, receive real-time booking updates, automatic **email notifications**, and professional **PDF invoices**, while admins manage everything via a powerful dashboard.

---

## ✨ Features

### 👤 **User Module**
- 🔐 Register with OTP email verification  
- 🔑 JWT-based login and authentication  
- 🧑‍🏭 Profile management with Cloudinary image upload  
- 📦 Book moving services (house, office, vehicle, storage)  
- 🧾 Receive booking confirmation email + PDF invoice  
- ❌ Cancel pending bookings  
- 👁️ View booking history  

### 🧑‍💼 **Admin Module**
- 🧍‍♂️ View all users  
- 🚫 Block / ✅ Unblock users  
- 🔄 Change user role (User ↔ Admin)  
- 📋 View and manage bookings  
- 🟢 Approve / 🔴 Decline / 🗑️ Delete bookings  
- 📈 Dashboard with:
  - Total Users  
  - Total Bookings  
  - Total Revenue  
  - Monthly Revenue Graph  
  - Revenue by Service Type  
- 📧 Email alerts for new bookings  
- 📤 Export booking reports (PDF / CSV)

---

## 🧩 Tech Stack

| Layer | Technology |
|--------|-------------|
| 💻 **Frontend** | React.js, Tailwind CSS |
| ⚙️ **Backend** | Node.js, Express.js |
| 🗄️ **Database** | MongoDB (Mongoose) |
| ☁️ **Cloud** | Cloudinary (Image Uploads) |
| 📧 **Email Service** | Nodemailer + Gmail SMTP |
| 🧾 **PDF Generation** | PDFKit |

---

## 🚀 Getting Started

### 📦 Clone the Repository
```bash
git clone https://github.com/yourusername/smart-packers-and-movers.git
cd smart-packers-and-movers
```

### ⚙️ Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### 🖥️ Frontend Setup
```bash
cd frontend
npm install
npm start
```

---

## 🔐 Environment Variables (.env)
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 💖 Author

👨‍💻 Developed by **Biswa Ranjan Behera**  
📧 Contact: [biswa@example.com](mailto:biswa@example.com)  
🌐 GitHub: [@biswa-ranjan-behera](https://github.com/biswa-ranjan-behera)

---

⭐ **If you like this project, don’t forget to give it a star!** ⭐
