"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Expand, X, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

/* container animation */
const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

/* item animation */
const item: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const images = [
  { src: "/gellary/gallery1.jpeg", caption: "Grand Lobby", tag: "Lobby" },
  { src: "/gellary/gallery2.jpg", caption: "Deluxe Suite", tag: "Rooms" },
  { src: "/gellary/gallery3.jpeg", caption: "Infinity Pool", tag: "Pool" },
  { src: "/gellary/gallery4.jpeg", caption: "Fine Dining", tag: "Dining" },
  { src: "/gellary/gallery5.jpeg", caption: "Spa & Wellness", tag: "Spa" },
];

/* bento spans — only applied at lg+, mobile stacks naturally */
const spans = [
  "lg:col-span-2 lg:row-span-2",
  "lg:col-span-2 lg:row-span-1",
  "lg:col-span-1 lg:row-span-1",
  "lg:col-span-1 lg:row-span-1",
  "lg:col-span-4 lg:row-span-1",
];

const GallerySection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const showPrev = () =>
    setActiveIndex((prev) =>
      prev === null ? null : (prev - 1 + images.length) % images.length
    );

  const showNext = () =>
    setActiveIndex((prev) =>
      prev === null ? null : (prev + 1) % images.length
    );

  return (
    <section className="relative pt-16  px-3 md:px-6 lg:px-10 overflow-hidden">

      {/* decorative background glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#EF9F27]/10 blur-3xl rounded-full" />

      {/* TITLE */}
      <div className="relative max-w-3xl mx-auto text-center mb-16">
        <span className="inline-block text-xs tracking-[0.3em] uppercase text-[#EF9F27] font-semibold mb-3">
          Visual Story
        </span>

        <h2 className="text-4xl md:text-5xl font-bold text-[#042C53]">
          Hotel <span className="text-[#EF9F27]">Gallery</span>
        </h2>

        <div className="mx-auto mt-4 h-[3px] w-16 rounded-full bg-gradient-to-r from-[#EF9F27] to-[#FAC775]" />

        <p className="mt-5 text-gray-600 leading-relaxed">
          Moments of luxury, comfort, and unforgettable experiences at Boshonto Hotel.
        </p>
      </div>

      {/* BENTO GRID */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[190px] gap-5 max-w-7xl mx-auto"
      >
        {images.map((img, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={() => setActiveIndex(index)}
            className={`relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl ring-1 ring-black/5 group cursor-pointer transition-shadow duration-500 ${spans[index]}`}
          >
            {/* IMAGE WRAPPER */}
            <div
              className={`relative w-full lg:h-full ${
                index === 0 ? "h-[320px] sm:h-[380px]" : "h-[220px] sm:h-[260px]"
              }`}
            >
              <Image
                src={img.src}
                alt={img.caption}
                fill
                priority={index === 0}
                quality={index === 0 ? 85 : 75}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

              {/* category tag - always visible */}
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide bg-white/15 backdrop-blur-md text-white ring-1 ring-white/20">
                {img.tag}
              </span>

              {/* caption + zoom icon - reveal on hover */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-white font-heading tracking-wide ${
                      index === 0 ? "text-2xl" : "text-lg"
                    }`}
                  >
                    {img.caption}
                  </span>
                  <span className="flex items-center justify-center h-9 w-9 rounded-full bg-white/20 backdrop-blur-sm ring-1 ring-white/30 shrink-0">
                    <Expand className="h-4 w-4 text-white" />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA below grid */}

      {/* LIGHTBOX */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm px-4"
            onClick={() => setActiveIndex(null)}
          >
            <button
              onClick={() => setActiveIndex(null)}
              className="absolute top-6 right-6 h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="h-5 w-5 text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              className="absolute left-4 md:left-8 h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-white" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              className="absolute right-4 md:right-8 h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-white" />
            </button>

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl h-[70vh] rounded-xl overflow-hidden"
            >
              <Image
                src={images[activeIndex].src}
                alt={images[activeIndex].caption}
                fill
                quality={90}
                sizes="90vw"
                className="object-contain"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white font-heading text-xl tracking-wide text-center">
                  {images[activeIndex].caption}
                </p>
                <p className="text-white/60 text-xs text-center mt-1">
                  {activeIndex + 1} / {images.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default GallerySection;