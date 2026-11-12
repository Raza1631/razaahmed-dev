"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useState } from "react";

/** Appears after scrolling past the hero and returns to the top of the page. */
export function BackToTop() {
  const { scrollY } = useScroll();
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  // Only re-renders when the threshold is crossed, not on every scroll event.
  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 700;
    setVisible((prev) => (prev === next ? prev : next));
  });

  function goToTop() {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    // The button is about to disappear, so hand focus to the logo link.
    document
      .querySelector<HTMLElement>("header a")
      ?.focus({ preventScroll: true });
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={goToTop}
          aria-label="Back to top"
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="btn btn-secondary group fixed right-4 bottom-4 z-40 h-11 w-11 !rounded-full !p-0 shadow-lg shadow-black/20 backdrop-blur sm:right-8 sm:bottom-8"
        >
          <ArrowUp
            size={18}
            className="transition-transform duration-200 group-hover:-translate-y-0.5"
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
