"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Renders the current year in the visitor's browser, so the footer never goes
 * stale. The server render leaves it empty (reading the clock during
 * prerendering is not allowed with Cache Components).
 */
export function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => String(new Date().getFullYear()),
    () => "",
  );
  return <span suppressHydrationWarning>{year}</span>;
}
