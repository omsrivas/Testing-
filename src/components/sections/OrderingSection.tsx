import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const ORDER_TYPES = ["Pickup", "Delivery", "Catering"] as const;
type OrderType = typeof ORDER_TYPES[number];

const PRODUCTS = [
  { id: "sourdough", name: "Levain Sourdough", price: 14, unit: "loaf" },
  { id: "croissant", name: "Butter Croissant", price: 6, unit: "piece" },
  { id: "tart", name: "Raspberry Tart", price: 9, unit: "piece" },
  { id: "cake", name: "Vanilla Berry Cake", price: 65, unit: "cake" },
  { id: "macarons", name: "Signature Macarons", price: 24, unit: "box of 6" },
];

type Quantities = Record<string, number>;

export default function OrderingSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-8%" });

  const [orderType, setOrderType] = useState<OrderType>("Pickup");
  const [quantities, setQuantities] = useState<Quantities>({});
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const adjust = (id: string, delta: number) => {
    setQuantities(prev => {
      const next = (prev[id] ?? 0) + delta;
      return { ...prev, [id]: Math.max(0, next) };
    });
  };

  const orderItems = PRODUCTS.filter(p => (quantities[p.id] ?? 0) > 0);
  const subtotal = orderItems.reduce((sum, p) => sum + p.price * (quantities[p.id] ?? 0), 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || orderItems.length === 0) return;
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSubmitted(true); }, 1600);
  };

  return (
    <section id="order" className="py-32 overflow-hidden" style={{ backgroundColor: "#FFF8E8" }} ref={ref}>
      <div className="container mx-auto px-6">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <p className="font-sans text-[#D8943D] tracking-[0.3em] uppercase text-xs mb-4">Fresh Daily</p>
          <h2 className="font-serif text-[#6B2C1A] mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 6rem)" }}>
            Place Your Order
          </h2>
          <p className="font-sans text-[#8A5A3B] font-light text-lg max-w-md mx-auto">
            Fresh baked. Thoughtfully made. Delivered with care.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              className="max-w-lg mx-auto text-center py-20"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <div className="w-16 h-16 rounded-full bg-[#D8943D]/15 flex items-center justify-center mx-auto mb-6">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#D8943D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <p className="font-serif italic text-[#6B2C1A] text-3xl mb-3">Order received.</p>
              <p className="font-sans text-[#8A5A3B] text-sm">
                Thank you, {name}. We'll confirm your order shortly at {email}.
              </p>
              <button
                className="mt-8 font-sans text-xs tracking-[0.2em] uppercase text-[#D8943D] border border-[#D8943D]/40 px-6 py-3 rounded-full hover:bg-[#D8943D] hover:text-white transition-all duration-300"
                onClick={() => { setSubmitted(false); setQuantities({}); setDate(""); }}
              >
                Place Another Order
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">

                {/* Left panel */}
                <div className="space-y-10">

                  {/* Order type */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
                  >
                    <p className="font-sans text-[#6B2C1A] tracking-widest uppercase text-xs mb-4">Order Type</p>
                    <div className="flex gap-3 flex-wrap">
                      {ORDER_TYPES.map(type => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setOrderType(type)}
                          className="relative px-6 py-3 rounded-full font-sans text-sm tracking-wide transition-all duration-300 overflow-hidden"
                          style={{
                            backgroundColor: orderType === type ? "#D8943D" : "transparent",
                            color: orderType === type ? "#FFF8E8" : "#8A5A3B",
                            border: `1px solid ${orderType === type ? "#D8943D" : "rgba(216,148,61,0.35)"}`,
                          }}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </motion.div>

                  {/* Date */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
                  >
                    <p className="font-sans text-[#6B2C1A] tracking-widest uppercase text-xs mb-4">
                      {orderType === "Pickup" ? "Pickup Date" : orderType === "Delivery" ? "Delivery Date" : "Event Date"}
                    </p>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className="bg-transparent border-b border-[#D8943D]/40 py-3 font-sans text-[#3B2416] text-sm focus:outline-none focus:border-[#D8943D] transition-colors w-full max-w-xs"
                    />
                  </motion.div>

                  {/* Product selection */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
                  >
                    <p className="font-sans text-[#6B2C1A] tracking-widest uppercase text-xs mb-5">Select Items</p>
                    <div className="space-y-4">
                      {PRODUCTS.map((product, i) => (
                        <motion.div
                          key={product.id}
                          className="flex items-center justify-between py-4 border-b"
                          style={{ borderColor: "rgba(216,148,61,0.2)" }}
                          initial={{ opacity: 0, x: -16 }}
                          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                          transition={{ duration: 0.7, delay: 0.25 + i * 0.06, ease: EASE }}
                        >
                          <div>
                            <p className="font-serif text-[#6B2C1A] text-lg leading-tight">{product.name}</p>
                            <p className="font-sans text-[#8A5A3B] text-xs mt-0.5">
                              ${product.price} / {product.unit}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              onClick={() => adjust(product.id, -1)}
                              disabled={(quantities[product.id] ?? 0) === 0}
                              className="w-8 h-8 rounded-full border border-[#D8943D]/40 text-[#D8943D] flex items-center justify-center text-lg font-light hover:bg-[#D8943D] hover:text-white hover:border-[#D8943D] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              −
                            </button>
                            <span className="font-sans text-[#3B2416] w-5 text-center text-sm font-medium">
                              {quantities[product.id] ?? 0}
                            </span>
                            <button
                              type="button"
                              onClick={() => adjust(product.id, 1)}
                              className="w-8 h-8 rounded-full border border-[#D8943D]/40 text-[#D8943D] flex items-center justify-center text-lg font-light hover:bg-[#D8943D] hover:text-white hover:border-[#D8943D] transition-all duration-200"
                            >
                              +
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Contact fields */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
                  >
                    <p className="font-sans text-[#6B2C1A] tracking-widest uppercase text-xs mb-5">Your Details</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
                      <input
                        required value={name} onChange={e => setName(e.target.value)}
                        placeholder="Full Name"
                        className="bg-transparent border-b border-[#D8943D]/40 py-3 font-sans text-sm text-[#3B2416] placeholder:text-[#8A5A3B]/60 focus:outline-none focus:border-[#D8943D] transition-colors"
                      />
                      <input
                        required type="email" value={email} onChange={e => setEmail(e.target.value)}
                        placeholder="Email Address"
                        className="bg-transparent border-b border-[#D8943D]/40 py-3 font-sans text-sm text-[#3B2416] placeholder:text-[#8A5A3B]/60 focus:outline-none focus:border-[#D8943D] transition-colors"
                      />
                      <input
                        value={phone} onChange={e => setPhone(e.target.value)}
                        placeholder="Phone (optional)"
                        className="bg-transparent border-b border-[#D8943D]/40 py-3 font-sans text-sm text-[#3B2416] placeholder:text-[#8A5A3B]/60 focus:outline-none focus:border-[#D8943D] transition-colors"
                      />
                      {orderType === "Delivery" && (
                        <input
                          placeholder="Delivery Address"
                          className="bg-transparent border-b border-[#D8943D]/40 py-3 font-sans text-sm text-[#3B2416] placeholder:text-[#8A5A3B]/60 focus:outline-none focus:border-[#D8943D] transition-colors"
                        />
                      )}
                    </div>
                  </motion.div>

                </div>

                {/* Right: Order summary */}
                <motion.div
                  className="lg:sticky lg:top-28"
                  initial={{ opacity: 0, x: 24 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
                  transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
                >
                  <div
                    className="rounded-[24px] p-8 border"
                    style={{ backgroundColor: "#F8E8A6", borderColor: "rgba(216,148,61,0.3)" }}
                  >
                    <p className="font-sans text-[#6B2C1A] tracking-widest uppercase text-xs mb-6">Order Summary</p>

                    <div className="space-y-3 min-h-[120px]">
                      <AnimatePresence>
                        {orderItems.length === 0 ? (
                          <motion.p
                            key="empty"
                            className="font-sans text-[#8A5A3B]/60 text-sm text-center pt-6"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          >
                            No items selected yet.
                          </motion.p>
                        ) : (
                          orderItems.map(p => (
                            <motion.div
                              key={p.id}
                              className="flex justify-between items-start"
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              transition={{ duration: 0.35, ease: EASE }}
                            >
                              <div>
                                <p className="font-sans text-[#6B2C1A] text-sm">{p.name}</p>
                                <p className="font-sans text-[#8A5A3B] text-xs">× {quantities[p.id]}</p>
                              </div>
                              <p className="font-sans text-[#D8943D] text-sm font-medium">
                                ${(p.price * (quantities[p.id] ?? 0)).toFixed(2)}
                              </p>
                            </motion.div>
                          ))
                        )}
                      </AnimatePresence>
                    </div>

                    {orderItems.length > 0 && (
                      <>
                        <div className="border-t border-[#D8943D]/25 my-5" />
                        <div className="flex justify-between items-center mb-2">
                          <p className="font-sans text-[#8A5A3B] text-sm">Subtotal</p>
                          <p className="font-serif text-[#6B2C1A] text-lg">${subtotal.toFixed(2)}</p>
                        </div>
                        <p className="font-sans text-[#8A5A3B]/60 text-xs mb-6">
                          {orderType === "Pickup" ? "Ready for pickup on selected date." : orderType === "Delivery" ? "Delivery fee calculated at checkout." : "Custom catering — we'll contact you to confirm."}
                        </p>
                      </>
                    )}

                    <motion.button
                      type="submit"
                      disabled={submitting || orderItems.length === 0 || !date}
                      className="w-full py-4 rounded-full font-sans tracking-[0.2em] uppercase text-xs transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ backgroundColor: "#6B2C1A", color: "#F8E8A6" }}
                      whileHover={{ scale: orderItems.length > 0 && date ? 1.02 : 1 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      {submitting ? "Placing Order…" : "Place Order"}
                    </motion.button>

                    {(orderItems.length === 0 || !date) && (
                      <p className="font-sans text-[#8A5A3B]/50 text-xs text-center mt-3">
                        {orderItems.length === 0 ? "Add items to continue." : "Select a date to continue."}
                      </p>
                    )}
                  </div>
                </motion.div>

              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
