/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import { motion, easeOut, type Variants } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Fraunces, Manrope } from "next/font/google";
import { getAllRooms } from "@/actions/room.action";

// Display face for the headline (warm, editorial serif with a real italic)
// paired with a clean grotesque for everything functional.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

// One parent variant with staggered children keeps the whole entrance
// in sync instead of every motion.* element running its own timeline.
const content: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const floatCard: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut, delay },
  }),
};

const HeroSection = () => {
  const [roomNumber, setRoomNumber] = useState(0);
  const [lowestPrice, setLowestPrice] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const stats = [
    { value: "4.9★", label: "Guest Rating" },
    { value: roomNumber, label: "Rooms" },
    { value: "15yr", label: "Years Trusted" },
  ];

  useEffect(() => {
    const getRooms = async () => {
      const rooms = await getAllRooms();
      const lowest =
        rooms?.data?.length > 0
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ? Math.min(...rooms.data.map((room: any) => Number(room.pricePerNight)))
          : 0;

      setLowestPrice(lowest);
      setRoomNumber(rooms?.meta?.total ?? 0);
      setLoaded(true);
    };
    getRooms();
  }, []);

  return (
    <section
      className={`${manrope.className} relative overflow-hidden h-[70vh] min-h-[520px] max-h-[75vh] flex items-end`}
    >
      {/* the photo IS the background — no color panel underneath it */}
      <Image
        src="/hero.jpg"
        alt="Boshonto Hotel, a luxury sea-view room in Cox's Bazar"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* legibility scrim, just enough to read text over the photo */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#042C53]/85 via-[#042C53]/35 to-[#042C53]/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#042C53]/55 via-transparent to-transparent" />

      {/* rooms available chip, floating top-right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5, ease: easeOut }}
        className="absolute top-6 right-6 z-20 bg-white/85 backdrop-blur-xl border border-white/40 rounded-2xl pl-3 pr-4 py-2.5 flex items-center gap-2.5"
      >
        <span className="w-2 h-2 rounded-full bg-[#EF9F27] animate-pulse" />
        <p className="text-[#042C53] text-xs font-bold leading-tight">
          {roomNumber} Rooms
          <span className="block font-medium text-[#042C53]/55">Available now</span>
        </p>
      </motion.div>

      <motion.div
        variants={content}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full px-8 md:px-14 lg:px-20 pb-16 lg:pb-24"
      >
        <div className="max-w-2xl">
          <motion.div variants={item} className="flex items-center gap-3 mb-5">
            <svg width="26" height="10" viewBox="0 0 26 10" fill="none">
              <path
                d="M0 5c3-5 6-5 9 0s6 5 9 0 6-5 8-2"
                stroke="#EF9F27"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-[#EF9F27] text-xs font-semibold tracking-[0.2em] uppercase">
              Boshonto Hotel · Cox's Bazar
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-[2.75rem] leading-[1.08] md:text-6xl md:leading-[1.05] font-medium tracking-tight mb-6 text-white"
          >
            Wake up to the
            <br />
            <span
              className={`${fraunces.className} italic font-normal text-[#EF9F27] relative inline-block`}
            >
              Bay of Bengal
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="8"
                viewBox="0 0 220 8"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5c18-6 36-6 55 0s36 6 55 0 36-6 55 0 36 6 55 0"
                  stroke="#EF9F27"
                  strokeOpacity="0.55"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-white/75 text-base leading-relaxed max-w-sm mb-9"
          >
            Steps from the world's longest natural sea beach, Boshonto pairs
            warm Bengali hospitality with quiet, contemporary comfort.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-4 mb-10">
            <Link
              href="/rooms"
              className="group bg-[#EF9F27] text-[#042C53] font-bold text-sm px-7 py-4 rounded-2xl shadow-[0_8px_24px_rgba(239,159,39,0.28)] hover:shadow-[0_10px_28px_rgba(239,159,39,0.4)] hover:-translate-y-0.5 transition-all duration-300 inline-flex items-center gap-2"
            >
              Explore Rooms
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>

          <motion.div variants={item} className="flex items-center gap-7">
            <div className="flex gap-7">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex flex-col gap-0.5 ${
                    i < stats.length - 1 ? "pr-7 border-r border-white/20" : ""
                  }`}
                >
                  <span className="text-white font-bold text-2xl tabular-nums">{s.value}</span>
                  <span className="text-white/55 text-[10px] font-medium tracking-widest uppercase">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            {/* price, folded into the same row instead of a separate card */}
            <motion.div
              variants={floatCard}
              custom={0.6}
              className="pl-7 border-l border-white/20"
            >
              <p className="text-white/55 text-[10px] font-semibold tracking-wide uppercase mb-1">
                Starting from
              </p>
              <p className="text-[#EF9F27] font-bold text-2xl leading-none">
                {loaded ? `৳ ${lowestPrice.toLocaleString()}` : "—"}
                <span className="text-white/55 text-xs font-normal"> /night</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;