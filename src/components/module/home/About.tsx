/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: {
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1] as const,
    delay,
  },
  viewport: { once: true },
});

const stats = [
  { value: "200+", label: "Luxury Rooms" },
  { value: "4.9★", label: "Guest Rating" },
  { value: "15+", label: "Years Experience" },
  { value: "24/7", label: "Service" },
];

const AboutSection = () => {
  return (
    <section className="pt-12 px-3 md:px-6 lg:px-10 bg-white">
      <div className="max-w-5xl mx-auto text-center">

        {/* LABEL */}
        <motion.p
          {...fadeUp(0)}
          className="text-[#EF9F27] font-semibold tracking-[0.2em] uppercase text-sm"
        >
          About Boshonto Hotel
        </motion.p>

        {/* TITLE */}
        <motion.h2
          {...fadeUp(0.1)}
          className="mt-4 text-4xl md:text-5xl font-bold text-[#042C53] leading-tight"
        >
          Luxury Hospitality in the Heart of{" "}
          <span className="text-[#EF9F27]">Cox's Bazar</span>
        </motion.h2>

        {/* DESCRIPTION */}
        <motion.p
          {...fadeUp(0.2)}
          className="mt-6 text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto"
        >
          Boshonto Hotel is a modern luxury destination offering comfort,
          elegance, and world-class hospitality. We focus on creating a peaceful
          environment where guests can relax, recharge, and enjoy premium
          services tailored to their needs.
        </motion.p>

        <motion.p
          {...fadeUp(0.3)}
          className="mt-4 text-gray-600 text-base leading-relaxed max-w-3xl mx-auto"
        >
          Whether you are visiting for business or leisure, our goal is to make
          your stay memorable with exceptional service, stylish rooms, and a
          welcoming atmosphere.
        </motion.p>

        {/* STATS */}
        <motion.div
          {...fadeUp(0.4)}
          className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((item, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl font-bold text-[#042C53]">
                {item.value}
              </p>
              <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">
                {item.label}
              </p>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;