import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CursorGlow: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth out the movement using spring physics
  const springConfig = { damping: 45, stiffness: 200, mass: 0.8 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable glow on devices with hover capabilities (desktops)
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setEnabled(mediaQuery.matches);

    const handleMouseMove = (e: MouseEvent) => {
      // Offset by half of the glow circle's width (300px / 2 = 150px)
      mouseX.set(e.clientX - 150);
      mouseY.set(e.clientY - 150);
    };

    if (mediaQuery.matches) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none z-40 radial-glow-1 opacity-45 mix-blend-screen blur-[80px]"
      style={{
        x: glowX,
        y: glowY,
      }}
    />
  );
};
