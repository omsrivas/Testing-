import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import gal1 from "@assets/chestnut-gallery-1.png";
import gal2 from "@assets/chestnut-gallery-2.png";
import gal3 from "@assets/chestnut-gallery-3.png";
import gal4 from "@assets/chestnut-creation-croissant.png";
import gal5 from "@assets/chestnut-creation-tart.png";
import gal6 from "@assets/chestnut-creation-cake.png";

const EASE = [0.22, 1, 0.36, 1] as const;

// Fixed CSS-grid masonry — no `columns` CSS (avoids Framer Motion / repaint glitch)
// Explicit 3-col grid with row-span to mimic masonry
const items = [
  { src: gal1, aspect: "aspect-[4/5]", span: "" },
  { src: gal2, aspect: "aspect-[3/2]", span: "" },
  { src: gal3, aspect: "aspect-[4/5]", span: "row-span-2" },
  { src: gal4, aspect: "aspect-[3/4]", span: "" },
  { src: gal5, aspect: "aspect-[3/2]", span: "" },
  { src: gal6, aspect: "aspect-[4/3]", span: "" },
];

export default function GallerySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section id="gallery" className="py-32" style={{ backgroundColor: "#FDF5E6" }} ref={ref}>
      <div className="container mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="mb-16 text-center"
        >
          <h2 className="font-serif text-[#6B2C1A]" style={{ fontSize: "clamp(2.5rem, 5vw, 6rem)" }}>
            The Atelier
          </h2>
          <p className="font-sans text-[#8A5A3B] tracking-widest uppercase text-xs mt-3">
            A glimpse inside the craft
          </p>
        </motion.div>

        {/* Stable grid-based layout — no CSS columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[240px]">
          {items.map((item, i) => (
            <motion.div
              key={i}
              className={`relative overflow-hidden rounded-[24px] group ${item.span}`}
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              transition={{ duration: 0.9, delay: i * 0.08, ease: EASE }}
            >
              <motion.img
                src={item.src}
                alt={`Atelier ${i + 1}`}
                className="w-full h-full object-cover rounded-[24px]"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              {/* Hover glow border */}
              <div className="absolute inset-0 rounded-[24px] border border-transparent group-hover:border-[#D8943D]/50 transition-colors duration-500 pointer-events-none" />
              {/* Subtle bottom gradient */}
              <div className="absolute inset-0 rounded-[24px] bg-gradient-to-t from-[rgba(90,46,28,0.25)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
