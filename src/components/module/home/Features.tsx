/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { Waves, Wifi, UtensilsCrossed, Sparkles, Dumbbell } from "lucide-react";

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

const features = [
  {
    icon: Waves,
    title: "Beachfront Access",
    description:
      "Step out to the world's longest natural sea beach, just moments from your room.",
  },
  {
    icon: Sparkles,
    title: "Spa & Wellness",
    description:
      "Unwind with signature treatments, a steam room, and a calm, private setting.",
  },
  {
    icon: UtensilsCrossed,
    title: "Fine Dining",
    description:
      "Fresh seafood and local flavors served with a view of the water.",
  },
  {
    icon: Dumbbell,
    title: "Fitness Center",
    description:
      "A fully equipped gym open around the clock for however your day is shaped.",
  },
  {
    icon: Wifi,
    title: "High-Speed WiFi",
    description:
      "Complimentary, reliable connectivity across every room and common space.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="pt-14 px-3 md:px-6 lg:px-10">
      <div className="max-w-5xl mx-auto text-center">

        {/* LABEL */}
        <motion.p
          {...fadeUp(0)}
          className="text-[#EF9F27] font-semibold tracking-[0.2em] uppercase text-sm"
        >
          Hotel Features
        </motion.p>

        {/* TITLE */}
        <motion.h2
          {...fadeUp(0.1)}
          className="mt-4 text-4xl md:text-5xl font-bold text-[#042C53] leading-tight"
        >
          Everything You Need for a{" "}
          <span className="text-[#EF9F27]">Perfect Stay</span>
        </motion.h2>

        {/* DESCRIPTION */}
        <motion.p
          {...fadeUp(0.2)}
          className="mt-6 text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto"
        >
          From the moment you arrive to the moment you check out, every
          detail is designed around your comfort, whether you're here to
          relax, celebrate, or work.
        </motion.p>

      </div>

      {/* FEATURES LIST — each row reveals on its own as you scroll to it, then stays visible */}
      <div className="mt-10 max-w-4xl mx-auto">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
              className={`group flex items-start gap-6 py-8 md:py-10 ${
                i !== features.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <div className="shrink-0 w-14 h-14 rounded-full bg-[#042C53]/5 flex items-center justify-center transition-colors duration-300 group-hover:bg-[#EF9F27]/10">
                <Icon className="w-6 h-6 text-[#EF9F27]" strokeWidth={1.75} />
              </div>

              <div className="text-left">
                <h3 className="text-xl font-bold text-[#042C53]">
                  {feature.title}
                </h3>
                <p className="mt-2 text-gray-600 text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

    </section>
  );
};

export default FeaturesSection;