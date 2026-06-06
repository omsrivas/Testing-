import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    quote: "Bimbo Bakers doesn't just sell bread. They sell a feeling. Every bite of that sourdough takes me back to my grandmother's kitchen in Lyon.",
    name: "Isabelle M., Paris",
    initials: "IM"
  },
  {
    quote: "The croissants are the finest I've had outside of France. The lamination is perfect — shatteringly crisp, impossibly buttery.",
    name: "James T., London",
    initials: "JT"
  },
  {
    quote: "I ordered the vanilla berry cake for our anniversary dinner and my guests were speechless. Art you can eat.",
    name: "Sofia R., Milan",
    initials: "SR"
  }
];

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section className="py-32 relative" style={{ backgroundColor: "#FDF5E6" }} ref={ref}>
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="font-serif text-[#6B2C1A]" style={{ fontSize: 'clamp(2.5rem, 5vw, 6rem)' }}>What Our Guests Say</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="bg-[#FFF3D2] border border-[#E5C46A] p-10 relative overflow-hidden flex flex-col justify-between"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: i * 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Top border glow */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D8943D] to-transparent" />
              
              <div className="absolute top-4 left-6 font-serif text-[8rem] leading-none text-[#D8943D] opacity-20 select-none">
                "
              </div>

              <p className="font-serif italic text-xl text-[#6B2C1A] leading-relaxed relative z-10 mb-12 pt-8">
                {t.quote}
              </p>

              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-[#F3DE96] flex items-center justify-center border border-[#D8943D]/40">
                  <span className="font-serif text-[#D8943D] text-sm">{t.initials}</span>
                </div>
                <div>
                  <h4 className="font-sans font-medium text-[#D8943D] tracking-wide text-sm">{t.name}</h4>
                  <div className="text-[#D8943D] text-xs tracking-widest mt-1">
                    ★★★★★
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}