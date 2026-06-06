import { motion } from "framer-motion";
import heroCakeImg from "@assets/E56E6210-1DF6-4EEB-888C-7728295B57F2_1780689461760.png";
import heroCakeMobileImg from "@assets/IMG_0534_1780711301507.PNG";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function HeroSection() {
  return (
    <section style={{ backgroundColor: "#F8E8A6" }}>

      {/* ─── MOBILE / TABLET layout (below lg) ──────────────────────────────
          Portrait image as full-width background.
          Text floats over the upper empty yellow negative space.
          Image is never cropped — original aspect ratio preserved.
      ─────────────────────────────────────────────────────────────────── */}
      <div className="lg:hidden relative w-full overflow-x-hidden">

        {/* Portrait image — full width, natural height, no crop, no zoom */}
        <img
          src={heroCakeMobileImg}
          alt="Bimbo Bakers signature cake"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />

        {/* Text overlay — absolutely positioned over the upper yellow space.
            The empty yellow area is ~42 % from the top of the image.
            We stay well above the first miniature baker (≈38 % mark).        */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 2 }}
        >
          {/* Inner padding: clear fixed navbar (64 px) + give top breathing room */}
          <div className="px-6 sm:px-10" style={{ paddingTop: "80px" }}>

            <motion.span
              className="block font-sans uppercase"
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.32em",
                color: "#C47A44",
                marginBottom: "14px",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            >
              Est. 2024
            </motion.span>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.25, ease: EASE }}
            >
              {/* "Crafted by Tiny Hands." — luxury serif */}
              <p
                className="font-serif leading-[1.07]"
                style={{
                  fontSize: "clamp(1.85rem, 8.5vw, 2.8rem)",
                  color: "#6B3A2E",
                  marginBottom: "6px",
                }}
              >
                Crafted by<br />Tiny Hands.
              </p>

              {/* "Loved by Everyone." — Pinyon Script (logo font) */}
              <p
                style={{
                  fontFamily: "'Pinyon Script', cursive",
                  fontSize: "clamp(2.1rem, 9.5vw, 3.2rem)",
                  color: "#8A6A4A",
                  lineHeight: 1.1,
                  marginBottom: "18px",
                }}
              >
                Loved by Everyone.
              </p>
            </motion.div>

            <motion.p
              className="font-sans font-light leading-relaxed"
              style={{
                fontSize: "clamp(0.78rem, 3.2vw, 0.9rem)",
                color: "#8A6A4A",
                maxWidth: "26ch",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
            >
              Artisan breads, pastries and desserts<br />handcrafted every morning.
            </motion.p>

          </div>
        </div>

      </div>

      {/* ─── DESKTOP layout (lg and above) — unchanged ───────────────────── */}
      <div
        className="hidden lg:block relative overflow-hidden"
        style={{ height: "100dvh" }}
      >
        {/* Full-bleed landscape cake image */}
        <img
          src={heroCakeImg}
          alt="Bimbo Bakers signature cake"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ zIndex: 0 }}
        />

        {/* Subtle left vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, rgba(248,232,166,0.52) 0%, rgba(248,232,166,0.18) 40%, transparent 62%)",
            zIndex: 1,
          }}
        />

        {/* Text block — anchored left */}
        <div className="absolute inset-0 flex items-center" style={{ zIndex: 2 }}>
          <div className="pl-6 lg:pl-12 xl:pl-16" style={{ maxWidth: "min(42%, 560px)" }}>

            <motion.span
              className="block font-sans uppercase mb-6"
              style={{ fontSize: "0.65rem", letterSpacing: "0.32em", color: "#C47A44" }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            >
              Est. 2024
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
            >
              <span
                className="font-serif block leading-[1.06]"
                style={{ fontSize: "clamp(2.6rem, 5vw, 6.5rem)", color: "#6B3A2E" }}
              >
                Crafted by<br />Tiny Hands.
              </span>
              <span
                className="block mt-3 leading-[1.1]"
                style={{
                  fontFamily: "'Pinyon Script', cursive",
                  fontSize: "clamp(3rem, 5.8vw, 7.5rem)",
                  color: "#8A6A4A",
                }}
              >
                Loved by Everyone.
              </span>
            </motion.h1>

            <motion.p
              className="font-sans font-light leading-relaxed mt-8"
              style={{
                fontSize: "clamp(0.875rem, 1.1vw, 1.05rem)",
                color: "#8A6A4A",
                maxWidth: "30ch",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.65, ease: EASE }}
            >
              Artisan breads, pastries and desserts<br />handcrafted every morning.
            </motion.p>

          </div>
        </div>

      </div>

    </section>
  );
}
