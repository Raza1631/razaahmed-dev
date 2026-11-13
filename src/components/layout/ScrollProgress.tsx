"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin bar at the top of the viewport that fills as the page is scrolled. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  // The spring only smooths the bar. It updates a motion value, so scrolling
  // never triggers a React re-render.
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{
        scaleX,
        background: "linear-gradient(90deg, var(--primary), var(--secondary))",
      }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[55] h-[3px] origin-left will-change-transform"
    />
  );
}
