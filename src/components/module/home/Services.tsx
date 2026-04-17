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

/* ANIMATION */
const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const card: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
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
    desc: "Delicious meals prepared by expert chefs with premium taste.",
  },
  {
    icon: Wifi,
    title: "High-Speed WiFi",
    desc: "Fast and stable internet throughout the hotel.",
  },
  {
    icon: Car,
    title: "Free Parking",
    desc: "Secure and spacious parking for all guests.",
  },
  {
    icon: ShieldCheck,
    title: "24/7 Security",
    desc: "Complete safety with round-the-clock monitoring.",
  },
  {
    icon: Clock,
    title: "24/7 Service",
    desc: "Always available support for your comfort.",
  },
];

const ServicesSection = () => {
  return (
    <section className="pt-12 px-3 md:px-6 lg:px-10">

      {/* HEADER */}
      <div className="max-w-3xl mx-auto text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-bold text-[#042C53]">
          Premium <span className="text-[#EF9F27]">Services</span>
        </h2>

        <p className="mt-4 text-gray-600 text-base md:text-lg">
          Experience world-class hospitality with comfort, safety, and luxury tailored for you.
        </p>
      </div>

      {/* GRID */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
      >
        {services.map((service, index) => {
          const Icon = service.icon;

          return (
            <motion.div
              key={index}
              variants={card}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative p-7 rounded-3xl bg-white border border-[#042C53]/10 shadow-sm hover:shadow-xl transition overflow-hidden"
            >

              {/* subtle glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-[#EF9F27]/10 to-transparent" />

              {/* ICON */}
              <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-[#042C53] text-white mb-5 group-hover:bg-[#EF9F27] transition">
                <Icon className="w-5 h-5" />
              </div>

              {/* TITLE */}
              <h3 className="text-lg font-semibold text-[#042C53]">
                {service.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
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