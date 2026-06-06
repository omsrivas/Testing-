import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); setSent(true); }, 1500);
  };

  return (
    <section id="visit" className="py-32 relative overflow-hidden" style={{ backgroundColor: "#5A2E1C" }} ref={ref}>

      {/* Warm ambient glow top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-[200px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top, rgba(216,148,61,0.18) 0%, transparent 70%)" }} />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="text-center mb-16"
        >
          <p className="font-sans text-[#D8943D] tracking-[0.3em] uppercase text-xs mb-5">Get In Touch</p>
          <h2 className="font-serif text-[#F8E8A6] mb-5" style={{ fontSize: "clamp(2.5rem, 5vw, 6rem)" }}>
            Visit Bimbo Bakers
          </h2>
          <p className="font-sans font-light text-lg" style={{ color: "rgba(248,232,166,0.7)" }}>
            Reserve your table or enquire about custom orders.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          className="rounded-[24px] p-8 md:p-12 border"
          style={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(216,148,61,0.25)" }}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
        >
          {sent ? (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <p className="font-serif italic text-[#F8E8A6] text-3xl mb-3">Thank you.</p>
              <p className="font-sans text-sm" style={{ color: "rgba(248,232,166,0.65)" }}>
                We'll be in touch shortly.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <input
                    type="text" required placeholder="Your Name"
                    className="w-full bg-transparent border-b py-4 font-sans text-sm focus:outline-none transition-colors placeholder:text-sm"
                    style={{ borderColor: "rgba(216,148,61,0.35)", color: "#F8E8A6" }}
                  />
                </div>
                <div>
                  <input
                    type="email" required placeholder="Your Email"
                    className="w-full bg-transparent border-b py-4 font-sans text-sm focus:outline-none transition-colors placeholder:text-sm"
                    style={{ borderColor: "rgba(216,148,61,0.35)", color: "#F8E8A6" }}
                  />
                </div>
              </div>
              <div>
                <textarea
                  required placeholder="Message" rows={4}
                  className="w-full bg-transparent border-b py-4 font-sans text-sm focus:outline-none transition-colors resize-none placeholder:text-sm"
                  style={{ borderColor: "rgba(216,148,61,0.35)", color: "#F8E8A6" }}
                />
              </div>
              <div className="pt-2 text-center">
                <motion.button
                  type="submit" disabled={isSubmitting}
                  className="relative px-12 py-4 font-sans tracking-[0.2em] uppercase text-xs overflow-hidden rounded-full disabled:opacity-60"
                  style={{ backgroundColor: "#D8943D", color: "#5A2E1C" }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  {isSubmitting ? "Sending…" : "Send Enquiry"}
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>

        {/* Address row */}
        <motion.div
          className="mt-16 text-center flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 font-sans text-sm tracking-wide"
          style={{ color: "rgba(248,232,166,0.55)" }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: EASE }}
        >
          <span>12 Rue de la Paix, Paris</span>
          <span className="hidden md:inline w-1 h-1 rounded-full bg-[#D8943D]" />
          <span>Open Tue–Sun, 7am–7pm</span>
          <span className="hidden md:inline w-1 h-1 rounded-full bg-[#D8943D]" />
          <a href="mailto:hello@bimbobakers.com" className="transition-colors hover:text-[#D8943D]">
            hello@bimbobakers.com
          </a>
        </motion.div>

      </div>
    </section>
  );
}
