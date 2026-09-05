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
    <section className="relative pt-16 px-3 md:px-6 lg:px-10 bg-white overflow-hidden">

      {/* decorative background glow */}
      <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] bg-[#EF9F27]/10 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3" />

      {/* HEADER */}
      <div className="relative max-w-3xl mx-auto text-center mb-16">
        <span className="inline-block text-xs tracking-[0.3em] uppercase text-[#EF9F27] font-semibold mb-3">
          What We Offer
        </span>

        <h2 className="text-4xl md:text-5xl font-bold text-[#042C53]">
          Premium <span className="text-[#EF9F27]">Services</span>
        </h2>

        <div className="mx-auto mt-4 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#EF9F27] to-[#FAC775]" />

        <p className="mt-5 text-[#042C53]/60 text-base leading-relaxed">
          Comfort, safety, and luxury — designed for a perfect stay.
        </p>
      </div>

      {/* GRID */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 max-w-7xl mx-auto"
      >
        {services.map((service, index) => {
          const Icon = service.icon;

          return (
            <motion.div
              key={index}
              variants={card}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative p-8 rounded-2xl border border-[#042C53]/10 bg-white overflow-hidden transition-shadow duration-500 hover:shadow-2xl"
            >

              {/* large faded number - background decoration */}
              <span className="absolute -top-2 right-5 text-7xl font-heading font-bold text-[#042C53]/[0.04] group-hover:text-[#EF9F27]/[0.08] transition-colors duration-500 select-none">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* gold accent line - grows on hover */}
              <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[#EF9F27] to-[#FAC775] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500" />

              {/* ICON */}
              <div className="relative w-14 h-14 flex items-center justify-center rounded-2xl bg-[#042C53] text-white group-hover:bg-[#EF9F27] group-hover:rotate-6 transition-all duration-500 shadow-sm">
                <Icon className="w-6 h-6" />
              </div>

              {/* TITLE */}
              <h3 className="relative mt-6 text-xl font-heading font-semibold text-[#042C53]">
                {service.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="relative mt-2.5 text-sm text-[#042C53]/60 leading-relaxed">
                {service.desc}
              </p>

              {/* bottom hairline that expands on hover */}
              <div className="relative mt-6 h-px w-8 bg-[#042C53]/15 group-hover:w-full group-hover:bg-[#EF9F27]/40 transition-all duration-500" />

            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default ServicesSection;