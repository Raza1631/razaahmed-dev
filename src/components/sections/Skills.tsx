"use client";

import { motion, type Variants } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  skillCategories,
  skillsSection,
  type SkillCategory,
} from "@/data/skills";
import { trackPointer } from "@/lib/pointer";
import { useHydratedReducedMotion } from "@/lib/useHydratedReducedMotion";
import { cn } from "@/lib/utils";

/** Grid placement per category on large screens (3-column grid). */
const gridSpan: Record<string, string> = {
  laravel: "lg:col-span-2",
};

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.15 } },
};

const entry: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

function SkillCard({ category }: { category: SkillCategory }) {
  const reduceMotion = useHydratedReducedMotion();
  const Icon = category.icon;

  // Without motion, render items immediately.
  const itemVariants: Variants = reduceMotion
    ? { hidden: { opacity: 1 }, show: { opacity: 1 } }
    : entry;

  return (
    <div
      onMouseMove={trackPointer}
      className="card group hover:border-primary/50 relative flex h-full w-full flex-col overflow-hidden p-6 transition-colors duration-300"
    >
      {/* Pointer spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(260px circle at var(--mx, 50%) var(--my, 0%), color-mix(in srgb, var(--primary) 14%, transparent), transparent 70%)",
        }}
      />

      <div className="relative flex items-center gap-3">
        <span className="bg-surface text-primary border-border group-hover:text-secondary flex h-10 w-10 items-center justify-center rounded-xl border transition-colors duration-300">
          <Icon size={19} />
        </span>
        <h3 className="text-lg font-semibold">{category.title}</h3>
      </div>

      <motion.ul
        variants={list}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -60px 0px" }}
        className={cn(
          "relative mt-6",
          category.layout === "chips"
            ? "flex flex-wrap gap-2.5"
            : "grid gap-3 sm:grid-cols-2",
        )}
      >
        {category.skills.map((skill) => {
          const SkillIcon = skill.icon;
          return (
            <motion.li
              key={skill.name}
              variants={itemVariants}
              className={cn(
                "bg-surface border-border text-foreground hover:border-primary/60 hover:-translate-y-0.5 cursor-default border transition-[transform,border-color] duration-200",
                category.layout === "chips"
                  ? "rounded-full px-3.5 py-1.5 text-sm"
                  : "flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm sm:[&:last-child:nth-child(odd)]:col-span-2",
              )}
            >
              {SkillIcon && (
                <SkillIcon size={17} className="text-secondary shrink-0" />
              )}
              {skill.name}
            </motion.li>
          );
        })}
      </motion.ul>
    </div>
  );
}

export function Skills() {
  return (
    <Section id="skills" decoration={<SkillsDecoration />}>
      <Reveal>
        <SectionHeading
          eyebrow={skillsSection.eyebrow}
          title={skillsSection.heading}
          accent={skillsSection.headingAccent}
        />
      </Reveal>

      <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category, i) => (
          <li key={category.id} className={cn(gridSpan[category.id], "flex")}>
            <Reveal delay={i * 0.07} className="flex w-full">
              <SkillCard category={category} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}

function SkillsDecoration() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div
        className="absolute -right-40 top-10 h-96 w-96 rounded-full blur-3xl"
        style={{
          background: "color-mix(in srgb, var(--secondary) 10%, transparent)",
        }}
      />
    </div>
  );
}
