/* eslint-disable react/no-unescaped-entities */
"use client";

import { LazyMotion, domAnimation, m, type Variants } from "framer-motion";

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

const questionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const answerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};

const faqs = [
  {
    question: "What are the check-in and check-out times?",
    answer:
      "Check-in starts at 2:00 PM and check-out is by 11:00 AM. Early check-in or late check-out can be arranged depending on availability.",
  },
  {
    question: "What's the cancellation and modification policy?",
    answer:
      "Cancel at least 48 hours before check-in for a full refund. Cancellations made after that window are charged for one night's stay.",
  },
  {
    question: "Is breakfast included with the room?",
    answer:
      "Yes, complimentary breakfast for two is included with every booking.",
  },
  {
    question: "Is the hotel close to the beach?",
    answer:
      "Yes, Boshonto Hotel is just a few minutes' walk from Cox's Bazar beach.",
  },
  {
    question: "Is free parking available at the hotel?",
    answer:
      "Yes, secure and free parking is available for all guests.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept cash, debit and credit cards, and mobile banking services like bKash, Nagad, and Rocket.",
  },
];

const FaqSection = () => {
  return (
    <LazyMotion features={domAnimation} strict>
      <section className="pt-14  px-3 md:px-6 lg:px-10">
        <div className="max-w-5xl mx-auto text-center">

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

        {/* FAQ LIST — question appears first, answer follows automatically a moment later */}
        <div className="mt-16 max-w-3xl mx-auto">
          {faqs.map((faq, i) => (
            <m.div
              key={faq.question}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5, margin: "0px 0px -60px 0px" }}
              className={`py-10 md:py-12 ${
                i !== faqs.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <m.h3
                variants={questionVariants}
                className="text-lg md:text-xl font-semibold text-[#042C53]"
              >
                {faq.question}
              </m.h3>
              <m.p
                variants={answerVariants}
                className="mt-3 text-gray-700 leading-relaxed max-w-2xl"
              >
                {faq.answer}
              </m.p>
            </m.div>
          ))}
        </div>

      </section>
    </LazyMotion>
  );
};

export default FaqSection;