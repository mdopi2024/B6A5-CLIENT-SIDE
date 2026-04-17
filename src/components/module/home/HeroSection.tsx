/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay },
});

const fadeRight = {
  initial: { opacity: 0, x: 44 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const, delay: 0.15 },
};

const floatCard = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay },
});

const stats = [
  { value: "4.9★", label: "Guest Rating" },
  { value: "200+", label: "Rooms" },
  { value: "15yr", label: "Trusted" },
];

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col">

      {/* soft floating glow */}
      <div
        className="pointer-events-none absolute -top-32 -right-20 w-[480px] h-[480px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(239,159,39,0.14) 0%, transparent 70%)"
        }}
      />

      {/* subtle depth */}
      <div className="absolute inset-0 bg-black/[0.02] pointer-events-none" />

      {/* MAIN GRID */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT */}
        <div className="flex flex-col justify-center px-8 md:px-16 py-16 lg:py-0">

          <motion.div {...fadeUp(0.1)} className="flex items-center gap-3 mb-6">
            <div className="w-7 h-px bg-[#EF9F27]" />
            <span className="text-[#EF9F27] text-xs font-semibold tracking-[0.18em] uppercase">
              Boshonto Hotel · cox's bazar
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.2)}
            className="text-5xl md:text-6xl font-black text-[#042C53] leading-[1.06] tracking-tight mb-5"
          >
            Luxury<br />
            <span className="text-[#EF9F27] relative">
              Redefined
              <span className="absolute bottom-0.5 left-0 w-full h-0.5 bg-[#EF9F27]/30 rounded" />
            </span><br />
            In Every
            Detail
          </motion.h1>

          <motion.p
            {...fadeUp(0.3)}
            className="text-[#042C53]/70 text-base leading-relaxed max-w-sm mb-8"
          >
            Experience the finest hospitality in the heart of Bangladesh.
            Premium rooms, curated dining, and a stay you will remember.
          </motion.p>

          <motion.div {...fadeUp(0.4)} className="flex flex-wrap items-center gap-3 mb-10">
            <Link
              href="/rooms"
              className="bg-[#EF9F27] text-white font-bold text-sm px-7 py-4 rounded-2xl shadow-md hover:scale-105 transition-all duration-300"
            >
              Explore Rooms
            </Link>

           
          </motion.div>

          <motion.div {...fadeUp(0.5)} className="flex gap-7">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-col gap-0.5 ${
                  i < stats.length - 1 ? "pr-7 border-r border-[#042C53]/10" : ""
                }`}
              >
                <span className="text-[#042C53] font-bold text-2xl">
                  {s.value}
                </span>
                <span className="text-[#042C53]/50 text-[10px] font-medium tracking-widest uppercase">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT */}
        <motion.div {...fadeRight} className="relative overflow-hidden min-h-[460px] lg:min-h-0">

          <Image
            src="/hero.jpg"
            alt="Bosonto Hotel luxury room"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/10 to-transparent" />

          {/* price card */}
          <motion.div
            {...floatCard(0.7)}
            className="absolute bottom-7 left-0 bg-white/80 backdrop-blur-xl border border-[#042C53]/10 rounded-2xl px-5 py-4 min-w-[155px]"
          >
            <p className="text-[#042C53]/60 text-[10px] font-semibold uppercase mb-1">
              Starting from
            </p>
            <p className="text-[#EF9F27] font-bold text-2xl leading-none">
              ৳120
              <span className="text-[#042C53]/40 text-xs font-normal"> /night</span>
            </p>
          </motion.div>

          {/* badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            className="absolute top-5 right-5 bg-[#EF9F27] rounded-xl px-4 py-2.5 text-center"
          >
            <p className="text-white text-xl font-bold">200+</p>
          </motion.div>

          {/* availability */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
            className="absolute top-1/2 -translate-y-1/2 right-5 bg-white/70 backdrop-blur-xl border border-[#042C53]/10 rounded-2xl px-4 py-3"
          >
            <p className="text-[#042C53] text-xs font-semibold">
              Rooms Available
            </p>
          </motion.div>

        </motion.div>
      </div>

    </section>
  );
};

export default HeroSection;