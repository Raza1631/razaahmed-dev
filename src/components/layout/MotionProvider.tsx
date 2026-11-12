"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Applies the visitor's reduced-motion preference to every Framer Motion
 * animation: movement and scaling are switched off, simple fades remain.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
