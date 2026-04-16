"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

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
  hidden: { opacity: 0, y: 30, scale: 0.95 },
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
  "/gellary/gallery1.jpeg",
  "/gellary/gallery2.jpg",
  "/gellary/gallery3.jpeg",
  "/gellary/gallery4.jpeg",
  "/gellary/gallery5.jpeg",
];

const GallerySection = () => {
  return (
    <section className="pt-12 px-6 md:px-12 lg:px-20">

      {/* TITLE */}
      <div className="max-w-3xl mx-auto text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-bold text-[#042C53]">
          Hotel <span className="text-[#EF9F27]">Gallery</span>
        </h2>

        <p className="mt-4 text-gray-600">
          Moments of luxury, comfort, and unforgettable experiences at Bosonto Hotel.
        </p>
      </div>

      {/* GRID */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
      >
        {images.map((src, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ scale: 1.02 }}
            className={`relative overflow-hidden rounded-2xl shadow-md group
              ${index === 0 ? "lg:col-span-2" : ""}`}
          >
            {/* IMAGE WRAPPER */}
            <div className="relative w-full h-[250px] md:h-[280px]">

              <Image
                src={src}
                alt={`Gallery image ${index + 1}`}
                fill
                priority={index === 0}
                quality={95}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />

              {/* overlay */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />
            </div>
          </motion.div>
        ))}
      </motion.div>

    </section>
  );
};

export default GallerySection;