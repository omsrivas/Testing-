import React, { useEffect, useState, useMemo } from 'react';
import NavBar from "@/components/NavBar";
import MouseGlow from "@/components/MouseGlow";
import HeroSection from "@/components/sections/HeroSection";
import StorySection from "@/components/sections/StorySection";
import CreationsSection from "@/components/sections/CreationsSection";
import ProcessSection from "@/components/sections/ProcessSection";
import GallerySection from "@/components/sections/GallerySection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import OrderingSection from "@/components/sections/OrderingSection";
import { motion } from "framer-motion";

export default function Home() {
  const flourParticles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.1 + 0.1,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 5,
      yOffset: -(Math.random() * 80 + 40),
    }));
  }, []);

  return (
    <div className="bg-[#F8E8A6] text-[#3B2416] min-h-screen selection:bg-[#D8943D] selection:text-[#FFF3D2]">
      <MouseGlow />
      
      {/* Flour Particles */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {flourParticles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#D8943D]"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              opacity: p.opacity,
            }}
            animate={{
              y: [0, p.yOffset, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <NavBar />
      
      <main className="relative z-10">
        <HeroSection />
        <StorySection />
        <CreationsSection />
        <ProcessSection />
        <GallerySection />
        <TestimonialsSection />
        <OrderingSection />
        <ContactSection />
      </main>
    </div>
  );
}