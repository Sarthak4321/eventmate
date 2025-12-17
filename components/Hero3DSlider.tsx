"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "Bride Makeup",
    img: "https://images.unsplash.com/photo-1600185365483-26d7f6f9e02b",
  },
  {
    id: 2,
    title: "Wedding Venue",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552",
  },
  {
    id: 3,
    title: "Decor & Styling",
    img: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde",
  },
  {
    id: 4,
    title: "Catering",
    img: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba",
  },
  {
    id: 5,
    title: "Bride Portrait",
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
  },
  {
    id: 6,
    title: "Corporate Event",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  },
];

export default function Hero3DSlider() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[360px] h-[480px] md:w-[420px] md:h-[560px] perspective-[1200px]">
      {slides.map((slide, index) => {
        const position =
          (index - active + slides.length) % slides.length;

        return (
          <motion.div
            key={slide.id}
            className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl"
            animate={{
              opacity: position === 0 ? 1 : 0.4,
              scale: position === 0 ? 1 : 0.92,
              rotateY: position === 0 ? 0 : -10,
              zIndex: slides.length - position,
              y: position * 18,
            }}
            transition={{
              duration: 0.9,
              ease: "easeInOut",
            }}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <img
              src={slide.img}
              alt={slide.title}
              className="h-full w-full object-cover"
            />
          </motion.div>
        );
      })}
    </div>
  );
}
