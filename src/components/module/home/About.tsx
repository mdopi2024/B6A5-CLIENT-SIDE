/* eslint-disable react/no-unescaped-entities */
"use client";

import { getAllRooms } from "@/actions/room.action";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Fraunces } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal"],
  display: "swap",
});

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

/* animated number counter - handles suffixes like ★, +, /7 */
const AnimatedStat = ({ value }: { value: string | number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    const str = String(value);
    const match = str.match(/^(\d+(\.\d+)?)/);
    let frameId: number;

    if (!match) {
      frameId = requestAnimationFrame(() => setDisplay(str));
      return () => cancelAnimationFrame(frameId);
    }

    const target = parseFloat(match[1]);
    const suffix = str.slice(match[1].length);
    const isDecimal = match[1].includes(".");
    const duration = 1200;
    const startTime = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const current = target * progress;
      setDisplay(
        (isDecimal ? current.toFixed(1) : Math.floor(current).toString()) +
          suffix
      );
      if (progress < 1) frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, value]);

  return <span ref={ref}>{display}</span>;
};

const AboutSection = () => {
  const [roomNumber, setRoomNumber] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const stats = [
    { value: roomNumber, label: "Luxury Rooms" },
    { value: "4.9★", label: "Guest Rating" },
    { value: "15+", label: "Years Experience" },
    { value: "24/7", label: "Service" },
  ];

  useEffect(() => {
    const getRooms = async () => {
      const rooms = await getAllRooms();
      setRoomNumber(rooms?.meta?.total ?? 0);
      setLoaded(true);
    };
    getRooms();
  }, []);

  return (
    <section className="pt-16 px-3 md:px-6 lg:px-10 bg-white">
      <div className="max-w-4xl mx-auto text-center">

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

        {/* gradient underline */}
        <motion.div
          {...fadeUp(0.15)}
          className="mx-auto mt-5 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#EF9F27] to-[#FAC775]"
        />

        {/* DESCRIPTION - merged into one tighter paragraph */}
        <motion.p
          {...fadeUp(0.2)}
          className="mt-6 text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto"
        >
          A modern luxury destination pairing warm Bengali hospitality with
          quiet, contemporary comfort — whether you're here for business or
          leisure, every detail is shaped around your stay.
        </motion.p>
      </div>

      {/* STATS — editorial hairline row, no cards */}
      <motion.div
        {...fadeUp(0.35)}
        className="mt-16 max-w-4xl mx-auto flex flex-wrap items-center justify-center"
      >
        {stats.map((item, i) => (
          <div
            key={i}
            className={`flex flex-col items-center px-8 md:px-12 py-4 md:py-0 ${
              i !== 0 ? "border-l border-[#042C53]/10" : ""
            }`}
          >
            <p
              className={`${fraunces.className} text-4xl md:text-5xl text-[#042C53] leading-none`}
            >
              {loaded ? <AnimatedStat value={item.value} /> : "—"}
            </p>
            <p className="mt-3 text-[11px] text-gray-500 uppercase tracking-[0.15em]">
              {item.label}
            </p>
          </div>
        ))}
      </motion.div>

      {/* closing hairline, echoes the section's minimal language */}
      <div className="mx-auto mt-16 h-px w-24 bg-[#042C53]/10" />
    </section>
  );
};

export default AboutSection;