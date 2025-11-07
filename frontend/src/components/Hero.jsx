import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[var(--cream)] to-[#fbe9d7] flex flex-col md:flex-row items-center justify-center px-6 md:px-16 overflow-hidden">
      {/* Soft Gradient Background Glow */}
      <div className="absolute top-0 left-0 w-[30rem] h-[30rem] bg-gradient-to-br from-[var(--accent)] via-[var(--light-brown)] to-transparent rounded-full blur-3xl opacity-40 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-[25rem] h-[25rem] bg-gradient-to-tl from-[var(--light-brown)] via-[var(--brown)] to-transparent rounded-full blur-3xl opacity-40 animate-pulse" />

      {/* Left Side - Text */}
      <motion.div
        className="flex-1 text-center md:text-left space-y-5 z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-[var(--brown)] leading-tight relative inline-block">
          Make Your Move <br />{" "}
          <span className="text-[var(--accent)] shimmer-text">Smarter</span> & Easier
        </h1>

        <p className="text-[var(--brown)] text-lg md:text-xl max-w-xl mx-auto md:mx-0">
          Experience a smooth and stress-free shifting journey with our trusted
          packers and movers service — reliable, fast, and affordable.
        </p>

        <motion.button
          whileHover={{
            scale: 1.05,
            backgroundColor: "var(--light-brown)",
            color: "var(--brown)",
          }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="mt-4 px-8 py-3 rounded-full bg-[var(--brown)] text-[var(--cream)] font-semibold shadow-md transition-all duration-300"
        >
          Get Started
        </motion.button>
      </motion.div>

      {/* Right Side - Illustration / Image */}
      <motion.div
        className="flex-1 flex justify-center mt-10 md:mt-0 relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Animated Gradient Glow Behind Image */}
        <motion.div
          className="absolute inset-0 flex justify-center items-center"
          animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.05, 1] }}
          transition={{
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
          }}
        >
          <div className="w-80 md:w-[26rem] h-80 md:h-[26rem] rounded-full bg-gradient-to-tr from-[var(--light-brown)] via-[var(--accent)] to-[var(--brown)] blur-3xl opacity-70"></div>
        </motion.div>

        {/* Main Image */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
          alt="Moving truck"
          className="relative w-72 md:w-96 drop-shadow-2xl transition-transform duration-500 hover:scale-105 z-10"
        />
      </motion.div>

      {/* Ground Reflection */}
      <div className="absolute bottom-0 left-0 w-full h-[4rem] bg-gradient-to-t from-[var(--light-brown)]/25 to-transparent"></div>

      {/* Shimmer Text Animation */}
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

export default Hero;
