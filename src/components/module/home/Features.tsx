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
    <section className="relative pt-16 px-3 md:px-6 lg:px-10 overflow-hidden">

      {/* decorative background glow */}
      <div className="pointer-events-none absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#EF9F27]/10 blur-3xl rounded-full -translate-x-1/2" />

      <div className="relative max-w-5xl mx-auto text-center">

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

        {/* gradient underline */}
        <motion.div
          {...fadeUp(0.15)}
          className="mx-auto mt-5 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#EF9F27] to-[#FAC775]"
        />

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

      {/* ALTERNATING TIMELINE */}
      <div className="relative mt-20 max-w-5xl mx-auto">

        {/* center connecting line - desktop only */}
        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-[#042C53]/15 to-transparent" />

        <div className="space-y-14 lg:space-y-4">
          {features.map((feature, i) => {
            const isEven = i % 2 === 0;
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: isEven ? -40 : 40, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col items-center lg:items-center gap-5 lg:flex-row lg:gap-0 py-6 lg:py-8"
              >
                {/* center icon node */}
                <div className="order-1 lg:order-2 relative z-10 shrink-0 w-16 h-16 rounded-full bg-white border-2 border-[#042C53]/10 flex items-center justify-center shadow-sm group-hover:border-[#EF9F27] group-hover:shadow-lg transition-all duration-500">
                  <Icon
                    className="w-6 h-6 text-[#042C53] group-hover:text-[#EF9F27] group-hover:scale-110 transition-all duration-500"
                    strokeWidth={1.75}
                  />
                </div>

                {/* text block */}
                <div
                  className={`order-2 lg:order-1 w-full lg:w-1/2 text-center lg:text-left ${
                    isEven
                      ? "lg:order-1 lg:text-right lg:pr-14"
                      : "lg:order-3 lg:pl-14"
                  }`}
                >
                  <span className="text-xs font-semibold tracking-[0.2em] text-[#EF9F27]">
                    0{i + 1}
                  </span>
                  <h3 className="mt-1 text-2xl font-heading font-bold text-[#042C53]">
                    {feature.title}
                  </h3>
                  <p className="mt-2.5 text-gray-600 text-base leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* spacer for symmetry on desktop */}
                <div
                  className={`hidden lg:block w-1/2 ${
                    isEven ? "lg:order-3" : "lg:order-1"
                  }`}
                />
              </motion.div>
            );
          })}
        </div>
      </div>

    </section>
  );
};

export default FeaturesSection;