"use client";

import { motion, type Variants } from "framer-motion";
import { Fragment } from "react";

const word: Variants = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/** Variants for the parent element: staggers the words inside it. */
export const wordsContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045 } },
};

/**
 * Slides each word up from behind a mask. Render it inside a motion element
 * that uses `wordsContainer`, so the words animate one after another.
 */
export function RevealWords({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={`${w}-${i}`}>
          <span className="inline-block overflow-hidden pb-[0.12em] align-bottom -mb-[0.12em]">
            <motion.span variants={word} className="inline-block">
              {w}
            </motion.span>
          </span>
          {/* The space lives outside the mask so it is never collapsed. */}
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}

/** Slides a whole block of text up from behind a mask as one unit. */
export function RevealBlock({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
      <motion.span variants={word} className={className ?? "inline-block"}>
        {children}
      </motion.span>
    </span>
  );
}
