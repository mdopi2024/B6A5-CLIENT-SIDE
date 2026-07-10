"use client";

import Link from "next/link";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: {
    opacity: 0,
    y: 24,
  },
  whileInView: {
    opacity: 1,
    y: 0,
  },
  viewport: {
    once: true,
    amount: 0.25,
  },
  transition: {
    duration: 0.7,
    delay,
    ease: [0.22, 1, 0.36, 1] as const,
  },
});

const CTASection = () => {
  return (
    <LazyMotion features={domAnimation}>
      <section className=" px-6">
        <div className="max-w-7xl mx-auto">
          <m.div
            {...fadeUp()}
            className="relative overflow-hidden rounded-3xl bg-[#042b53] px-8 py-16 md:px-16 md:py-20 text-center"
          >
            {/* Background Decoration */}
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[#EF9F27]/10" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-white/5" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <m.span
                {...fadeUp(0.1)}
                className="inline-flex rounded-full border border-[#EF9F27]/30 bg-[#EF9F27]/10 px-4 py-2 text-sm font-semibold uppercase tracking-widest text-[#EF9F27]"
              >
                Ready to Experience Boshonto?
              </m.span>

              <m.h2
                {...fadeUp(0.2)}
                className="mt-6 text-4xl md:text-5xl font-bold leading-tight text-white"
              >
                Book Your Stay Now
              </m.h2>

              <m.p
                {...fadeUp(0.3)}
                className="mt-6 text-lg leading-8 text-white/80"
              >
                Escape to comfort and elegance at Boshonto Hotel. Whether
                you are planning a family vacation, a romantic getaway, or a
                business trip, we are ready to make your stay unforgettable.
              </m.p>

              <m.div
                {...fadeUp(0.4)}
                className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link
                  href="/rooms"
                  className="inline-flex items-center gap-2 rounded-full bg-[#EF9F27] px-8 py-4 text-base font-semibold text-[#042C53] transition-all duration-300 hover:scale-105 hover:shadow-xl"
                >
                  Book Now
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <Link
                  href="/contact-us"
                  className="inline-flex items-center rounded-full border border-white/20 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:border-[#EF9F27] hover:text-[#EF9F27]"
                >
                  Contact Us
                </Link>
              </m.div>
            </div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  );
};

export default CTASection;