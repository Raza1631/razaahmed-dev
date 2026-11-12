import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  /** Final phrase of the heading, rendered with the brand gradient. */
  accent?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  accent,
  className,
}: SectionHeadingProps) {
  return (
    <div className={className}>
      {eyebrow && (
        <p className="text-secondary mb-4 text-sm font-medium tracking-[0.16em]">
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-3xl leading-[1.1] font-semibold sm:text-4xl lg:text-5xl",
        )}
      >
        {title}
        {accent && (
          <>
            {" "}
            <span className="gradient-text">{accent}</span>
          </>
        )}
      </h2>
    </div>
  );
}
