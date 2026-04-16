"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

/* LEFT ANIMATION */
const itemLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 20,
    },
  },
};

/* RIGHT ANIMATION */
const itemRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 20,
    },
  },
};

/* FADE UP */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const HeroSection = () => {
  return (
    <section className=" py-12 px-3 md:px-12 lg:px-20">
      
      {/* ❗ NO motion on wrapper (IMPORTANT FIX) */}
      <div className="max-w-7xl mx-auto border border-[#042C53]/10 rounded-3xl p-6 md:p-10 bg-white/70 backdrop-blur-sm shadow-lg">
        
        {/* STABLE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* TEXT (BOTTOM ON MOBILE) */}
          <motion.div
            variants={itemLeft}
            initial="hidden"
            animate="show"
            className="order-2 md:order-1"
          >
            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl font-bold text-[#042C53] leading-tight"
            >
              Experience Luxury & Comfort at{" "}
              <span className="text-[#EF9F27]">Bosonto Hotel</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-5 text-gray-600 text-lg"
            >
              Enjoy premium rooms, exceptional service, and a peaceful stay.
              Discover the perfect place to relax and feel at home.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8">
              <Link href='/rooms' className="bg-[#EF9F27] text-white px-7 py-3 rounded-xl font-medium shadow-md hover:bg-[#d88c1f] hover:scale-105 transition duration-300">
                Explore Rooms
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap gap-4 text-sm text-gray-500"
            >
              <span>⭐ 4.9 Rating</span>
              <span>🏨 Premium Rooms</span>
              <span>🌍 Trusted Stay</span>
            </motion.div>
          </motion.div>

          {/* IMAGE (TOP ON MOBILE) */}
          <motion.div
            variants={itemRight}
            initial="hidden"
            animate="show"
            className="relative order-1 md:order-2"
          >
            
            {/* 🔥 IMPORTANT FIX: isolate + stable height */}
            <div className="relative w-full h-[320px] md:h-[500px] overflow-hidden rounded-2xl isolate">
              <Image
                src="/hero.jpg"
                alt="Hotel Room"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>

            {/* FLOATING CARD */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4,
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94] as const,
              }}
              className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-white px-5 py-4 rounded-xl shadow-md border border-[#042C53]/10"
            >
              <p className="text-[#042C53] font-semibold text-sm">
                Starting from
              </p>
              <h3 className="text-[#EF9F27] text-xl font-bold">
                ৳120/night
              </h3>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;