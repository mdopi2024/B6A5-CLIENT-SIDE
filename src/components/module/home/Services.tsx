"use client";

import {
  Wifi,
  Utensils,
  BedDouble,
  Car,
  ShieldCheck,
  Clock,
} from "lucide-react";

import { motion, Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const card: Variants = {
  hidden: { opacity: 0, y: 25 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const services = [
  {
    icon: BedDouble,
    title: "Luxury Rooms",
    desc: "Elegant rooms designed for maximum comfort and relaxation.",
  },
  {
    icon: Utensils,
    title: "Fine Dining",
    desc: "World-class meals prepared by expert chefs.",
  },
  {
    icon: Wifi,
    title: "High-Speed WiFi",
    desc: "Fast and stable internet throughout the hotel.",
  },
  {
    icon: Car,
    title: "Free Parking",
    desc: "Secure parking for all guests.",
  },
  {
    icon: ShieldCheck,
    title: "24/7 Security",
    desc: "Safety and monitoring around the clock.",
  },
  {
    icon: Clock,
    title: "24/7 Service",
    desc: "Always available guest support.",
  },
];

const ServicesSection = () => {
  return (
    <section className="pt-12 px-3 md:px-6 lg:px-10 bg-white">

      {/* HEADER */}
      <div className="max-w-3xl mx-auto text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-bold text-[#042C53]">
          Premium <span className="text-[#EF9F27]">Services</span>
        </h2>

        <p className="mt-4 text-[#042C53]/60 text-base">
          Comfort, safety, and luxury — designed for a perfect stay.
        </p>
      </div>

      {/* GRID */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 max-w-7xl mx-auto"
      >
        {services.map((service, index) => {
          const Icon = service.icon;

          return (
            <motion.div
              key={index}
              variants={card}
              className="group relative p-7 rounded-2xl border border-[#042C53]/10 bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >

              {/* ✨ MOVING HOVER EFFECT (ONLY COLOR CHANGED HERE) */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-[#042C53]/20 to-transparent" />

              {/* ICON */}
              <div className="relative w-11 h-11 flex items-center justify-center rounded-xl bg-[#042C53] text-white group-hover:bg-[#042C53] transition-colors duration-300">
                <Icon className="w-5 h-5" />
              </div>

              {/* TITLE */}
              <h3 className="mt-5 text-lg font-semibold text-[#042C53]">
                {service.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="mt-2 text-sm text-[#042C53]/60 leading-relaxed">
                {service.desc}
              </p>

            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default ServicesSection;