import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import storyImg from "@assets/chestnut-story.png";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function StorySection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section id="story" className="relative py-32 overflow-hidden" style={{ backgroundColor: "#FFFFFF" }} ref={ref}>
      <div className="container mx-auto px-6">

        {/* Oversized heading */}
        <motion.div
          className="relative z-10 mb-16 md:mb-24"
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <h2
            className="font-serif italic text-[#6B2C1A] leading-[0.88]"
            style={{ fontSize: "clamp(3.5rem, 8vw, 10rem)" }}
          >
            Every Loaf <br /> Has A Story
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

          {/* Text — starts at col 1 (pushed fully left) */}
          <motion.div
            className="md:col-span-5 md:col-start-1 order-2 md:order-1"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
          >
            <div className="space-y-7 font-sans text-lg text-[#8A5A3B] font-light leading-relaxed">
              <p>
                In the quiet hours before dawn, when the city is still asleep,
                our atelier comes to life. It begins with the simplest of
                ingredients—flour, water, salt, and time.
              </p>
              <p>
                We believe that baking is an act of storytelling. Every fold of
                the dough, every precise measurement, and every careful watch
                over the rising crust is a chapter in our daily narrative of
                craft and devotion.
              </p>
              <p className="text-[#6B2C1A] italic font-serif text-2xl pt-4 leading-snug">
                "Patience is our primary ingredient."
              </p>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            className="md:col-span-6 md:col-start-7 order-1 md:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 1, delay: 0.4, ease: EASE }}
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[24px]">
              <motion.div
                className="absolute inset-0 bg-cover bg-center rounded-[24px]"
                style={{ backgroundImage: `url(${storyImg})` }}
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
              <div className="absolute inset-0 border border-[#D8943D]/20 m-4 pointer-events-none rounded-[20px]" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
