/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

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

const faqs = [
  {
    question: "What time can I check in and check out?",
    answer:
      "Check-in begins at 2:00 PM and check-out is at 11:00 AM. If you arrive earlier, you're welcome to leave your luggage at the front desk and use the hotel facilities while your room is prepared. Early check-in and late check-out are subject to availability and may include an additional charge.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Reservations can be cancelled free of charge up to 48 hours before your scheduled check-in date. Cancellations made within 48 hours of arrival, or no-shows, will be charged the equivalent of one night's stay. Non-refundable rate bookings are not eligible for cancellation or refund.",
  },
  {
    question: "Is breakfast included in the room rate?",
    answer:
      "Yes, all bookings include complimentary breakfast for two guests, served daily from 7:00 AM to 10:30 AM in our main restaurant. Additional guests can add breakfast at the time of booking or at the front desk for an extra charge.",
  },
  {
    question: "Do you offer airport or beach shuttle service?",
    answer:
      "Yes, we provide a complimentary shuttle to and from Cox's Bazar Airport, subject to advance booking at least 24 hours before your arrival or departure. A shuttle to the beach and nearby attractions also runs on a fixed schedule throughout the day, free for all in-house guests.",
  },
  {
    question: "Is parking available, and is it free?",
    answer:
      "Yes, we offer free, secure on-site parking for all registered guests on a first-come, first-served basis. CCTV monitoring is in place 24/7. Valet parking is also available upon request at the entrance.",
  },
  {
    question: "Are pets allowed at the hotel?",
    answer:
      "We currently do not allow pets in guest rooms or public areas, with the exception of registered service animals. Please contact us in advance if you plan to travel with a service animal so we can prepare accordingly.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept cash, all major debit and credit cards (Visa, Mastercard, and American Express), and mobile financial services including bKash, Nagad, and Rocket. A valid photo ID and a credit/debit card or cash deposit are required at check-in to cover incidentals.",
  },
  {
    question: "Can I request an early check-in or late check-out?",
    answer:
      "Yes, both are available on request and depend on occupancy for that day. We recommend contacting the front desk at least a few hours before your preferred time, and we'll do our best to accommodate you free of charge or for a small fee during high-occupancy periods.",
  },
  {
    question: "Is the hotel suitable for families with children?",
    answer:
      "Absolutely. We offer family rooms with extra bedding, a kids' play area, and a shallow section in our pool for younger guests. Children under 6 stay free when sharing a room with parents using existing bedding, and cribs are available on request.",
  },
  {
    question: "How far is the hotel from Cox's Bazar beach?",
    answer:
      "Boshonto Hotel is located approximately a 5-minute walk from the main beach point, with a direct pathway from our lobby. Beach chairs, umbrellas, and towel service can be arranged through the front desk for hotel guests.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <section className="relative py-16 px-3 md:px-6 lg:px-10 overflow-hidden">

        {/* decorative background glow */}
        <div className="pointer-events-none absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#EF9F27]/10 blur-3xl rounded-full translate-x-1/3" />

        <div className="relative max-w-5xl mx-auto text-center">

          {/* LABEL */}
          <m.p
            {...fadeUp(0)}
            className="text-[#EF9F27] font-semibold tracking-[0.2em] uppercase text-sm"
          >
            FAQ
          </m.p>

          {/* TITLE */}
          <m.h2
            {...fadeUp(0.1)}
            className="mt-4 text-4xl md:text-5xl font-bold text-[#042C53] leading-tight"
          >
            Frequently Asked{" "}
            <span className="text-[#EF9F27]">Questions</span>
          </m.h2>

          {/* gradient underline */}
          <m.div
            {...fadeUp(0.15)}
            className="mx-auto mt-5 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#EF9F27] to-[#FAC775]"
          />

          {/* DESCRIPTION */}
          <m.p
            {...fadeUp(0.2)}
            className="mt-6 text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto"
          >
            Answers to the questions we hear most about booking, check-in,
            and payments. Can't find what you're looking for? Feel free to
            reach out to us directly.
          </m.p>

        </div>

        {/* FAQ ACCORDION */}
        <div className="relative mt-16 max-w-3xl mx-auto">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <m.div
                key={faq.question}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className={`border-b ${
                  isOpen ? "border-[#042C53]/15" : "border-gray-100"
                } transition-colors duration-300`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-6 py-6 md:py-7 text-left group"
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`mt-0.5 text-xs font-semibold tracking-wide shrink-0 transition-colors duration-300 ${
                        isOpen ? "text-[#EF9F27]" : "text-[#042C53]/30"
                      }`}
                    >
                      0{i + 1}
                    </span>
                    <h3
                      className={`text-base md:text-lg font-semibold transition-colors duration-300 ${
                        isOpen ? "text-[#042C53]" : "text-[#042C53]/80"
                      } group-hover:text-[#042C53]`}
                    >
                      {faq.question}
                    </h3>
                  </div>

                  <span
                    className={`relative shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? "border-[#EF9F27] bg-[#EF9F27] rotate-45"
                        : "border-[#042C53]/15 group-hover:border-[#EF9F27]"
                    }`}
                  >
                    <Plus
                      className={`w-4 h-4 transition-colors duration-300 ${
                        isOpen ? "text-white" : "text-[#042C53]"
                      }`}
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 md:pb-7 pl-[2.1rem] pr-12 text-gray-600 leading-relaxed max-w-2xl">
                        {faq.answer}
                      </p>
                    </m.div>
                  )}
                </AnimatePresence>
              </m.div>
            );
          })}
        </div>

      </section>
    </LazyMotion>
  );
};

export default FaqSection;