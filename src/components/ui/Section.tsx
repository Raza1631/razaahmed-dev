import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  className?: string;
  /** Decorative layer rendered behind the content. */
  decoration?: ReactNode;
  children: ReactNode;
};

/** Shared wrapper so every section has the same anchor, divider, and spacing. */
export function Section({ id, className, decoration, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "border-border relative overflow-hidden border-t",
        className,
      )}
    >
      {decoration}
      <Container className="section-spacing relative">{children}</Container>
    </section>
  );
}
