import { useEffect, useRef } from "react";

export function useParallax(intensity: number = 20) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const animationFrame = useRef<number | undefined>(undefined);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !imageRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const progress = rect.top / viewportHeight;
      const moveY = progress * intensity * -5;
      
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      
      animationFrame.current = requestAnimationFrame(() => {
        if (imageRef.current) {
          imageRef.current.style.transform = `translateY(${moveY}px)`;
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [intensity]);

  return { containerRef, imageRef };
}
