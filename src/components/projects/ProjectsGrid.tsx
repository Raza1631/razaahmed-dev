"use client";

import { AnimatePresence } from "framer-motion";
import { useCallback, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";

type ProjectsGridProps = {
  /** Which projects have a real screenshot file in /public, by project id. */
  screenshots: Record<string, boolean>;
};

export function ProjectsGrid({ screenshots }: ProjectsGridProps) {
  const [openId, setOpenId] = useState<string | null>(null);
  const close = useCallback(() => setOpenId(null), []);
  const active = projects.find((p) => p.id === openId) ?? null;

  return (
    <>
      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <li
            key={project.id}
            className={cn("flex", project.featured && "lg:col-span-2")}
          >
            <Reveal delay={(i % 3) * 0.08} className="flex w-full">
              <ProjectCard
                project={project}
                hasScreenshot={Boolean(screenshots[project.id])}
                onOpen={() => setOpenId(project.id)}
              />
            </Reveal>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {active && (
          <ProjectModal
            key={active.id}
            project={active}
            hasScreenshot={Boolean(screenshots[active.id])}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </>
  );
}
