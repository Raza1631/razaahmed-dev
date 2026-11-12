import type { MouseEvent } from "react";

/** Moves a hover spotlight (CSS variables --mx / --my) to the pointer position. */
export function trackPointer(e: MouseEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
}
