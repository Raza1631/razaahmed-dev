import Image from "next/image";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

type ProjectVisualProps = {
  project: Project;
  /** True when the screenshot file exists in /public. */
  hasScreenshot: boolean;
  className?: string;
  sizes?: string;
};

/**
 * Shows the real screenshot when one exists. Otherwise it draws a generic
 * interface illustration and labels it as representative.
 */
export function ProjectVisual({
  project,
  hasScreenshot,
  className,
  sizes = "(min-width: 1024px) 40vw, 90vw",
}: ProjectVisualProps) {
  const Icon = project.icon;
  const accentVar =
    project.accent === "primary" ? "var(--primary)" : "var(--secondary)";
  const otherVar =
    project.accent === "primary" ? "var(--secondary)" : "var(--primary)";

  if (hasScreenshot && project.screenshot) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image
          src={project.screenshot}
          alt={`Screenshot of ${project.title}`}
          fill
          sizes={sizes}
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Representative illustration for ${project.title}`}
      className={cn("relative overflow-hidden", className)}
      style={{
        background: `linear-gradient(135deg, color-mix(in srgb, ${accentVar} 28%, var(--surface)), color-mix(in srgb, ${otherVar} 14%, var(--surface)))`,
      }}
    >
      {/* Faux interface window */}
      <div className="absolute inset-x-[10%] top-[14%] bottom-0 overflow-hidden rounded-t-xl border border-b-0 border-[color-mix(in_srgb,var(--foreground)_14%,transparent)] bg-[color-mix(in_srgb,var(--background)_70%,transparent)] backdrop-blur-sm transition-transform duration-500 group-hover:-translate-y-1.5">
        <div className="flex items-center gap-1.5 border-b border-[color-mix(in_srgb,var(--foreground)_10%,transparent)] px-3 py-2.5">
          <span className="bg-muted/50 h-1.5 w-1.5 rounded-full" />
          <span className="bg-muted/50 h-1.5 w-1.5 rounded-full" />
          <span className="bg-muted/50 h-1.5 w-1.5 rounded-full" />
        </div>
        <div className="grid grid-cols-[28%_1fr] gap-3 p-3">
          <div className="space-y-2">
            <span className="bg-muted/25 block h-2 w-full rounded" />
            <span className="bg-muted/25 block h-2 w-4/5 rounded" />
            <span className="bg-muted/25 block h-2 w-3/5 rounded" />
          </div>
          <div className="space-y-2.5">
            <span
              className="block h-2.5 w-2/3 rounded"
              style={{
                background: `color-mix(in srgb, ${accentVar} 55%, transparent)`,
              }}
            />
            <div className="grid grid-cols-3 gap-2">
              <span className="bg-muted/20 block h-9 rounded-md" />
              <span className="bg-muted/20 block h-9 rounded-md" />
              <span className="bg-muted/20 block h-9 rounded-md" />
            </div>
            <span className="bg-muted/20 block h-14 rounded-md" />
          </div>
        </div>
      </div>

      {/* Project icon */}
      <span
        className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-[40%] items-center justify-center rounded-2xl border border-[color-mix(in_srgb,var(--foreground)_18%,transparent)] shadow-lg transition-transform duration-500 group-hover:scale-110"
        style={{
          background: `color-mix(in srgb, ${accentVar} 85%, black)`,
          color: "white",
        }}
      >
        <Icon size={28} />
      </span>

      <span className="bg-background/80 text-muted border-border absolute bottom-3 left-3 rounded-full border px-2.5 py-1 text-[0.7rem] backdrop-blur">
        Representative visual
      </span>
    </div>
  );
}
