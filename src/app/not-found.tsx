/* eslint-disable react/no-unescaped-entities */
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 relative overflow-hidden"
      style={{
        backgroundColor: "#F1EFE8",
      }}
    >
      {/* 🌌 Background Pattern */}
      <div className="absolute inset-0 opacity-40">
        <div className="w-full h-full bg-[radial-gradient(#042C53_1px,transparent_1px)] [background-size:26px_26px] sm:[background-size:28px_28px]" />
      </div>

      {/* 🌟 Content */}
      <div className="relative z-10 w-full max-w-md sm:max-w-lg text-center flex flex-col items-center gap-5 sm:gap-6">

        {/* 🚀 Floating Object */}
        <motion.div
          animate={{
            y: [0, -16, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
          }}
          className="relative"
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl bg-[#042C53]/10 flex items-center justify-center text-3xl sm:text-4xl md:text-5xl">
            🛰️
          </div>

          {/* Glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl border border-[#EF9F27]/40"
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
            }}
          />
        </motion.div>

        {/* 404 */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-[#042C53] tracking-tight">
          404
        </h1>

        {/* Title */}
        <h2 className="text-lg sm:text-xl font-semibold text-[#042C53]">
          Lost in space...
        </h2>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#042C53]/70 max-w-xs sm:max-w-md leading-relaxed">
          The page you're trying to reach seems to have drifted away.
          Don’t worry — let’s bring you back safely.
        </p>

        {/* Button */}
        <Link
          href="/"
          className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#042C53] text-[#EF9F27] text-xs sm:text-sm font-medium hover:bg-[#0C447C] transition shadow-md"
        >
          <Home size={16} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}