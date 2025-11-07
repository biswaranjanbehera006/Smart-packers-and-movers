// src/components/Footer.jsx
import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#fff8e1] text-gray-800 pt-16 pb-8">
      {/* Main Footer Section */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Company Info */}
        <div>
          <h2 className="text-3xl font-bold text-[#d97706] mb-4">
            Smart Packers & Movers
          </h2>
          <p className="text-gray-700 leading-relaxed mb-5">
            We make your shifting experience simple, fast, and hassle-free with our reliable
            and professional packing and moving services across India.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-[#d97706] hover:text-[#f59e0b] transition-all">
              <FaFacebook size={22} />
            </a>
            <a href="#" className="text-[#d97706] hover:text-[#f59e0b] transition-all">
              <FaTwitter size={22} />
            </a>
            <a href="#" className="text-[#d97706] hover:text-[#f59e0b] transition-all">
              <FaInstagram size={22} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-2xl font-semibold text-[#d97706] mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-[#f59e0b] transition-all">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-[#f59e0b] transition-all">
                About Us
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-[#f59e0b] transition-all">
                Services
              </a>
            </li>
            <li>
              <a href="/how-it-works" className="hover:text-[#f59e0b] transition-all">
                How It Works
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-[#f59e0b] transition-all">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-2xl font-semibold text-[#d97706] mb-4">Get In Touch</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-[#d97706]" />
              <span>1234 Movers Street, Bhubaneswar, Odisha</span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-[#d97706]" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-[#d97706]" />
              <span>support@smartpackers.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-yellow-300 my-8 mx-6"></div>

      {/* Copyright */}
      <div className="text-center text-gray-700 text-sm">
        © {new Date().getFullYear()} Smart Packers & Movers. All Rights Reserved.
      </div>

      {/* Decorative bottom strip */}
      <div className="w-full h-2 mt-6 bg-gradient-to-r from-[#f59e0b] to-[#d97706]"></div>
    </footer>
  );
};

export default Footer;
