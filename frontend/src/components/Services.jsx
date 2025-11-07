import React from "react";
import { motion } from "framer-motion";

const services = [
  {
    title: "House Shifting",
    description:
      "We offer safe and quick home relocation with proper packing, loading, and transportation.",
    icon: "🏠",
  },
  {
    title: "Office Relocation",
    description:
      "Professional and efficient shifting solutions for offices and corporate spaces with minimal downtime.",
    icon: "🏢",
  },
  {
    title: "Vehicle Transport",
    description:
      "Secure car and bike transportation across cities with real-time tracking and delivery assurance.",
    icon: "🚗",
  },
  {
    title: "Local Moving",
    description:
      "Affordable and quick local moving services within the city with end-to-end handling.",
    icon: "📦",
  },
  {
    title: "Storage & Warehousing",
    description:
      "Safe and clean warehousing options for your belongings with flexible rental periods.",
    icon: "🏬",
  },
  {
    title: "Packing & Unpacking",
    description:
      "High-quality packing materials and expert handling to keep your items safe during transit.",
    icon: "🎁",
  },
];

const Services = () => {
  return (
    <section className="relative overflow-hidden py-20 px-6 md:px-16 bg-gradient-to-br from-[var(--cream)] to-[#fbe9d7]">
      {/* ✨ Matching Gradient Glow like Hero section */}
      <div className="absolute top-0 left-0 w-[25rem] h-[25rem] bg-gradient-to-br from-[var(--accent)] via-[var(--light-brown)] to-transparent rounded-full blur-3xl opacity-40 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[20rem] h-[20rem] bg-gradient-to-tl from-[var(--light-brown)] via-[var(--brown)] to-transparent rounded-full blur-3xl opacity-40 animate-pulse" />

      <div className="relative max-w-6xl mx-auto text-center z-10">
        <h2 className="text-4xl font-extrabold text-[var(--brown)] mb-4 drop-shadow-md">
          Our <span className="text-[var(--accent)] shimmer-text">Services</span>
        </h2>
        <p className="text-[var(--brown)] mb-12 max-w-2xl mx-auto">
          We provide complete relocation solutions with utmost safety, care, and
          transparency. Whether you’re moving across town or across the country,
          we make it stress-free.
        </p>

        {/* 🧊 Service Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-[#c9a57c]/40 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[var(--accent)]/20 to-[var(--light-brown)]/20 opacity-0 hover:opacity-100 blur-2xl transition-all duration-300"></div>
              <div className="relative z-10 text-5xl mb-4">{service.icon}</div>
              <h3 className="relative z-10 text-2xl font-semibold text-[var(--brown)] mb-2">
                {service.title}
              </h3>
              <p className="relative z-10 text-[var(--brown)] text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* shimmer animation reused from Hero */}
      <style>{`
        .shimmer-text {
          background: linear-gradient(90deg, var(--accent), var(--light-brown), var(--accent));
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
};

export default Services;
