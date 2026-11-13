"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import type { Project } from "@/data/projects";
import { ProjectVisual } from "./ProjectVisual";

type ProjectModalProps = {
  project: Project;
  hasScreenshot: boolean;
  onClose: () => void;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ProjectModal({
  project,
  hasScreenshot,
  onClose,
}: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const items = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  const titleId = `project-title-${project.id}`;

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center p-0 sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="bg-card border-border relative max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border shadow-2xl sm:rounded-3xl"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="bg-background/80 border-border hover:text-foreground text-muted absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-xl border backdrop-blur transition-colors"
        >
          <X size={18} />
        </button>

        <div className="group">
          <ProjectVisual
            project={project}
            hasScreenshot={hasScreenshot}
            className="aspect-[16/8] w-full"
            sizes="(min-width: 672px) 672px, 100vw"
          />
        </div>

        <div className="p-6 sm:p-8">
          <h3 id={titleId} className="text-2xl font-semibold sm:text-3xl">
            {project.title}
          </h3>
          <p className="text-muted mt-3 leading-relaxed">
            {project.description}
          </p>

          <h4 className="mt-7 text-sm font-medium">Key features</h4>
          <ul className="mt-3 space-y-2.5">
            {project.features.map((f, i) => (
              <motion.li
                key={f}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.12 + i * 0.05, duration: 0.25 }}
                className="flex gap-3 leading-relaxed"
              >
                <Check
                  size={17}
                  className="text-secondary mt-[0.28rem] shrink-0"
                />
                <span>{f}</span>
              </motion.li>
            ))}
          </ul>

          <h4 className="mt-7 text-sm font-medium">Technologies</h4>
          <ul className="mt-3 flex flex-wrap gap-2.5">
            {project.technologies.map((t) => (
              <li
                key={t}
                className="bg-surface border-border rounded-full border px-3.5 py-1.5 text-sm"
              >
                {t}
              </li>
            ))}
          </ul>

          {/* In-page links close the modal first, then scroll once it is gone. */}
          <div
            className="mt-8 flex flex-wrap gap-3"
            onClick={(e) => {
              const anchor = (e.target as HTMLElement).closest("a");
              const href = anchor?.getAttribute("href") ?? "";
              if (!href.startsWith("#")) return;
              e.preventDefault();
              onClose();
              setTimeout(() => {
                document.querySelector(href)?.scrollIntoView();
                history.replaceState(null, "", href);
              }, 320);
            }}
          >
            {project.liveUrl && (
              <Button href={project.liveUrl} external>
                View live <ArrowUpRight size={17} />
              </Button>
            )}
            {project.repoUrl && (
              <Button href={project.repoUrl} external variant="secondary">
                View code <ArrowUpRight size={17} />
              </Button>
            )}
            <Button
              href="#contact"
              variant={project.liveUrl || project.repoUrl ? "ghost" : "primary"}
            >
              Discuss a similar project
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
