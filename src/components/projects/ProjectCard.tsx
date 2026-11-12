"use client";

import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { ProjectVisual } from "./ProjectVisual";

type ProjectCardProps = {
  project: Project;
  hasScreenshot: boolean;
  onOpen: () => void;
};

export function ProjectCard({
  project,
  hasScreenshot,
  onOpen,
}: ProjectCardProps) {
  return (
    <article
      className={cn(
        "card group hover:border-primary/50 flex h-full w-full flex-col overflow-hidden transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_color-mix(in_srgb,var(--primary)_45%,transparent)]",
        project.featured && "lg:flex-row",
      )}
    >
      <ProjectVisual
        project={project}
        hasScreenshot={hasScreenshot}
        className={cn(
          "aspect-[16/10] w-full shrink-0",
          project.featured && "lg:aspect-auto lg:w-[46%]",
        )}
        sizes={
          project.featured
            ? "(min-width: 1024px) 330px, 90vw"
            : "(min-width: 1024px) 360px, (min-width: 768px) 45vw, 90vw"
        }
      />

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl leading-snug font-semibold">{project.title}</h3>
        <p className="text-muted mt-3 leading-relaxed">{project.description}</p>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <li
              key={t}
              className="bg-surface border-border text-muted rounded-full border px-3 py-1 text-xs"
            >
              {t}
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={onOpen}
          aria-haspopup="dialog"
          aria-label={`View details for ${project.title}`}
          className="text-foreground hover:text-secondary mt-auto flex items-center gap-1.5 self-start pt-6 text-sm font-medium transition-colors"
        >
          View Details
          <ArrowUpRight
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </button>
      </div>
    </article>
  );
}
