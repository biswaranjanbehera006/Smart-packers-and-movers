import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section
      className="relative py-12 md:py-20 px-6 md:px-16 overflow-hidden flex items-center justify-center"
      style={{
        background: "linear-gradient(135deg, #fff8f1 0%, #fbe9d7 40%, #f6dec4 100%)",
      }}
    >
      {/* Soft animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-72 h-72 bg-[#c9a57c]/25 rounded-full blur-3xl top-10 left-10 animate-pulse" />
        <div className="absolute w-96 h-96 bg-[#ffb6c1]/25 rounded-full blur-3xl bottom-10 right-10 animate-ping" />
      </div>

      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16 z-10">
        {/* Left Image */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring' }}
          viewport={{ once: true }}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
            alt="About Us"
            className="w-64 md:w-80 lg:w-96 drop-shadow-lg transition-transform duration-500 hover:scale-110"
          />
        </motion.div>

        {/* Right Text */}
        <motion.div
          className="flex-1 text-center md:text-left space-y-5"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#6f4e37]">
            About <span className="text-[#c9a57c]">Us</span>
          </h2>

          <p className="text-[#6f4e37] leading-relaxed text-lg">
            At{" "}
            <span className="font-semibold text-[#6f4e37]">
              Smart Packers and Movers
            </span>
            , we aim to make your relocation stress-free and smooth. Our team ensures
            each move is handled with care, precision, and professionalism — from
            start to finish.
          </p>

          <p className="text-[#6f4e37] leading-relaxed text-lg">
            With years of experience, trained experts, and modern equipment, we
            provide trusted moving solutions for both homes and businesses. Our goal
            is simple — to make your move{" "}
            <span className="text-[#ffb6c1] font-semibold">
              Smarter, Faster, and Easier
            </span>
            .
          </p>

          <motion.button
            whileHover={{
              scale: 1.08,
              backgroundColor: "#c9a57c",
              color: "#6f4e37",
            }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-8 py-3 rounded-full bg-[#6f4e37] text-[#fff8f1] font-semibold shadow-md transition-all duration-300"
          >
            Learn More
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
