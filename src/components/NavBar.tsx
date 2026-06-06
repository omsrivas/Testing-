import { useState } from "react";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const links = [
    { name: "Collection", href: "#collection" },
    { name: "Story", href: "#story" },
    { name: "Process", href: "#process" },
    { name: "Gallery", href: "#gallery" },
    { name: "Order", href: "#order" },
    { name: "Visit", href: "#visit" },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-500 ${
        isScrolled || mobileOpen
          ? "border-b"
          : ""
      }`}
      style={{
        backgroundColor: isScrolled || mobileOpen ? "rgba(248,232,166,0.96)" : "transparent",
        borderColor: isScrolled || mobileOpen ? "rgba(196,122,68,0.18)" : "transparent",
        backdropFilter: isScrolled || mobileOpen ? "blur(12px)" : "none",
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Desktop nav — single row, never wraps */}
      <div className="hidden lg:flex w-full px-8 lg:px-14 h-16 items-center justify-between">

        {/* Logo */}
        <a
          href="#"
          className="shrink-0"
          style={{
            fontFamily: "'Pinyon Script', cursive",
            fontSize: "2rem",
            color: "#6B3A2E",
            lineHeight: 1,
          }}
        >
          Bimbo Bakers
        </a>

        {/* Links — luxury serif, refined tracking */}
        <nav className="flex items-center" style={{ gap: "clamp(1.5rem, 3vw, 2.75rem)" }}>
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative group whitespace-nowrap transition-colors duration-200"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "0.95rem",
                fontWeight: 500,
                letterSpacing: "0.04em",
                color: "#6B3A2E",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "#C47A44")}
              onMouseLeave={e => (e.currentTarget.style.color = "#6B3A2E")}
            >
              {link.name}
              <span
                className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                style={{ backgroundColor: "#C47A44" }}
              />
            </a>
          ))}
        </nav>

      </div>

      {/* Mobile / tablet nav bar */}
      <div
        className="lg:hidden flex items-center justify-between px-6 h-16"
        style={{ backgroundColor: isScrolled || mobileOpen ? "rgba(248,232,166,0.96)" : "#F8E8A6" }}
      >
        <a
          href="#"
          style={{
            fontFamily: "'Pinyon Script', cursive",
            fontSize: "1.9rem",
            color: "#6B3A2E",
            lineHeight: 1,
          }}
        >
          Bimbo Bakers
        </a>

        {/* Hamburger */}
        <button
          aria-label="Toggle menu"
          className="flex flex-col justify-center items-center w-10 h-10 gap-[6px]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="block w-6 rounded-full"
            style={{ height: "1.5px", backgroundColor: "#C47A44" }}
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
            className="block w-6 rounded-full"
            style={{ height: "1.5px", backgroundColor: "#C47A44" }}
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="block w-6 rounded-full"
            style={{ height: "1.5px", backgroundColor: "#C47A44" }}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden border-t"
            style={{
              backgroundColor: "rgba(248,232,166,0.98)",
              borderColor: "rgba(196,122,68,0.18)",
            }}
          >
            <nav className="flex flex-col items-center py-8 gap-5">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "1.15rem",
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    color: "#6B3A2E",
                  }}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
