import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import sourdoughImg from "@assets/chestnut-creation-sourdough.png";
import croissantImg from "@assets/chestnut-creation-croissant.png";
import tartImg from "@assets/chestnut-creation-tart.png";
import cakeImg from "@assets/chestnut-creation-cake.png";
import macaronsImg from "@assets/chestnut-creation-macarons.png";

const EASE = [0.22, 1, 0.36, 1] as const;

const creations = [
  { id: "sourdough", name: "Levain Sourdough", desc: "Aged 48 hours, rich dark crust.", price: "$14", img: sourdoughImg },
  { id: "croissant", name: "Butter Croissant", desc: "Isigny Ste Mère butter, perfect lamination.", price: "$6", img: croissantImg },
  { id: "tart", name: "Raspberry Tart", desc: "Vanilla bean custard, fresh berries.", price: "$9", img: tartImg },
  { id: "cake", name: "Vanilla Berry Cake", desc: "Three layers of cloud-like sponge.", price: "$65", img: cakeImg },
  { id: "macarons", name: "Signature Macarons", desc: "Ivory gold and dark chocolate shells.", price: "$24", img: macaronsImg },
];

export default function CreationsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section id="collection" className="py-32 overflow-x-hidden" style={{ backgroundColor: "#FFF8E8" }} ref={ref}>

      {/* Section heading */}
      <div className="container mx-auto px-6 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <h2
            className="font-serif"
            style={{ fontSize: "clamp(2.2rem, 5vw, 5.5rem)", color: "#6B3A2E" }}
          >
            Signature Creations
          </h2>
          <p
            className="font-sans mt-3 uppercase tracking-widest"
            style={{ fontSize: "0.7rem", color: "#8A6A4A" }}
          >
            Each piece a small world of its own.
          </p>
        </motion.div>
      </div>

      {/* Grid — 3 col on desktop, 2 on tablet, 1 on mobile */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {creations.map((item, index) => (
            <motion.article
              key={item.id}
              className={`group cursor-pointer flex flex-col ${
                /* On desktop, center the lone 5th card in column 2 */
                index === 4 ? "sm:col-start-1 sm:col-end-2 sm:mx-auto sm:w-full lg:col-start-2" : ""
              }`}
              style={{ maxWidth: "400px", width: "100%" }}
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
              transition={{ duration: 0.9, delay: index * 0.08, ease: EASE }}
            >

              {/* ① Image */}
              <div
                className="relative overflow-hidden rounded-[20px] mb-5"
                style={{
                  aspectRatio: "3/4",
                  backgroundColor: "#F3E8D0",
                  boxShadow: "0 2px 16px rgba(107,58,46,0.07)",
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-cover bg-center rounded-[20px]"
                  style={{ backgroundImage: `url(${item.img})` }}
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />

                {/* Gold border on hover */}
                <div
                  className="absolute inset-0 rounded-[20px] border border-transparent group-hover:border-[#C47A44]/50 transition-colors duration-500 pointer-events-none"
                />

                {/* View details overlay */}
                <div
                  className="absolute inset-0 rounded-[20px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 backdrop-blur-[2px]"
                  style={{ backgroundColor: "rgba(255,248,232,0.75)" }}
                >
                  <span
                    className="font-sans uppercase border rounded-full px-6 py-2.5"
                    style={{
                      fontSize: "0.65rem",
                      letterSpacing: "0.2em",
                      color: "#6B3A2E",
                      borderColor: "#C47A44",
                      backgroundColor: "rgba(255,245,221,0.7)",
                    }}
                  >
                    View Details
                  </span>
                </div>
              </div>

              {/* ② Product Name */}
              <h3
                className="font-serif leading-tight group-hover:transition-colors duration-300"
                style={{
                  fontSize: "clamp(1.15rem, 2vw, 1.4rem)",
                  color: "#6B3A2E",
                }}
              >
                {item.name}
              </h3>

              {/* ③ Description */}
              <p
                className="font-sans font-light mt-2 leading-snug"
                style={{ fontSize: "0.875rem", color: "#8A6A4A" }}
              >
                {item.desc}
              </p>

              {/* ④ Price — always below description, min 24px gap */}
              <p
                className="font-sans font-medium"
                style={{
                  fontSize: "0.95rem",
                  color: "#C47A44",
                  letterSpacing: "0.04em",
                  marginTop: "1.5rem",   /* 24px */
                }}
              >
                {item.price}
              </p>

            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
