import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Select Ingredients",
    desc: "Sourcing only the finest organic grains and European butter."
  },
  {
    number: "02",
    title: "Handmade Preparation",
    desc: "Every dough is mixed, folded, and shaped entirely by hand."
  },
  {
    number: "03",
    title: "Slow Fermentation",
    desc: "Resting up to 48 hours to develop complex, deep flavors."
  },
  {
    number: "04",
    title: "Fresh Daily Baking",
    desc: "Baked on stone hearths every morning before dawn."
  }
];

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="process" className="py-32 relative overflow-hidden" style={{ backgroundColor: "#F8E8A6" }} ref={ref}>
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h2 className="font-serif italic text-[#6B2C1A] text-center" style={{ fontSize: 'clamp(2.5rem, 5vw, 6rem)' }}>
            The Art of Making
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-[7.5rem] left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-[#D8943D]/40 to-transparent z-0">
            <motion.div 
              className="h-full bg-gradient-to-r from-transparent via-[#D8943D]/40 to-transparent"
              initial={{ scaleX: 0, originX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="flex flex-col items-center md:items-start text-center md:text-left relative"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.8, delay: 0.2 + (i * 0.2), ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="relative mb-6">
                  {/* Backdrop blur behind number */}
                  <div className="absolute inset-0 bg-[#EFD487] blur-sm -z-10 rounded-full scale-125" />
                  <span className="font-serif text-[#D8943D] text-[5rem] leading-none opacity-80 block relative z-10">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-sans text-[#3B2416] text-xl font-medium tracking-wide mb-4 relative z-10 bg-[#EFD487] px-2 -ml-2 rounded">
                  {step.title}
                </h3>
                <p className="font-sans text-[#8A5A3B] font-light leading-relaxed max-w-xs relative z-10">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}