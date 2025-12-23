"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const slides = [
  { src: "/hero/bride.jpg", label: "Bride Makeup" },
  { src: "/hero/wedding-venue.jpg", label: "Wedding Venue" },
  { src: "/hero/decor.jpg", label: "Decor & Styling" },
  { src: "/hero/catering.jpg", label: "Catering" },
  { src: "/hero/photography.jpg", label: "Photography" },
  { src: "/hero/entertainment.jpg", label: "Entertainment" },
];

export default function Hero3DCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, 2500); // slower = premium

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-[420px] h-[520px]">
      {/* Soft ambient glow */}
      <div className="absolute -inset-12 bg-gradient-to-tr from-purple-500/20 via-pink-400/10 to-indigo-500/20 blur-3xl -z-10" />

      {slides.map((slide, i) => {
        const position = (i - active + slides.length) % slides.length;

        if (position > 2) return null;

        return (
          <motion.div
            key={slide.src}
            className="absolute inset-0 rounded-3xl overflow-hidden"
            animate={{
              scale: position === 0 ? 1 : 0.9 - position * 0.05,
              x: position * 24,
              y: position * 18,
              opacity: position === 0 ? 1 : 0.35,
            }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              zIndex: 10 - position,
              filter: position === 0 ? "blur(0px)" : "blur(2px)",
              boxShadow:
                position === 0
                  ? "0 40px 80px rgba(0,0,0,0.25)"
                  : "0 20px 40px rgba(0,0,0,0.15)",
            }}
          >
            <img
              src={slide.src}
              alt={slide.label}
              className="w-full h-full object-cover"
            />

            {/* LABEL */}
            {position === 0 && (
              <div className="absolute bottom-4 left-4 px-4 py-2 rounded-full bg-black/60 text-white text-sm backdrop-blur">
                {slide.label}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};