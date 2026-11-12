import { Building2, Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  experienceSection,
  formatPeriod,
  roles,
  type Role,
} from "@/data/experience";
import { cn } from "@/lib/utils";

function Period({ role, className }: { role: Role; className?: string }) {
  const text = formatPeriod(role);
  if (!text) return null;
  return (
    <p className={cn("text-sm font-medium text-foreground", className)}>
      {text}
    </p>
  );
}

function TimelineItem({ role, isLast }: { role: Role; isLast: boolean }) {
  return (
    <li className="grid grid-cols-[1.5rem_1fr] md:grid-cols-[13rem_1.5rem_1fr] md:gap-x-6">
      {/* Date column (desktop) */}
      <div className="hidden pt-[1.65rem] text-right md:block">
        <Period role={role} className="whitespace-nowrap" />
        {role.current && (
          <p className="text-secondary mt-1 text-xs">Current role</p>
        )}
      </div>

      {/* Line and node */}
      <div className="relative flex justify-center" aria-hidden="true">
        {!isLast && (
          <span className="bg-border absolute top-8 -bottom-[2.1rem] w-px" />
        )}
        <span className="relative mt-[1.85rem] flex h-3.5 w-3.5 items-center justify-center">
          {role.current && (
            <span className="bg-primary/40 absolute inline-flex h-full w-full rounded-full motion-safe:animate-ping" />
          )}
          <span
            className={cn(
              "relative h-3.5 w-3.5 rounded-full border-2",
              role.current
                ? "border-primary bg-primary"
                : "border-muted bg-background",
            )}
          />
        </span>
      </div>

      {/* Card */}
      <div className={cn("pl-4 md:pl-0", !isLast && "pb-10 md:pb-12")}>
        <Reveal>
          <article className="card hover:border-primary/50 p-6 transition-colors duration-300 sm:p-7">
            <div className="flex items-start gap-4">
              <span className="bg-surface text-primary border-border mt-0.5 hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl border sm:flex">
                <Building2 size={20} />
              </span>
              <div className="min-w-0">
                <h3 className="text-xl font-semibold">{role.company}</h3>
                <p className="text-secondary mt-1 text-base font-medium">
                  {role.title}
                </p>
                {/* Date (mobile) */}
                <div className="mt-2 md:hidden">
                  <Period role={role} className="text-muted" />
                  {role.current && (
                    <p className="text-secondary mt-0.5 text-xs">
                      Current role
                    </p>
                  )}
                </div>
              </div>
            </div>

            {role.summary && (
              <p className="text-muted mt-5 leading-relaxed">{role.summary}</p>
            )}

            {role.responsibilities && role.responsibilities.length > 0 && (
              <ul className="mt-5 space-y-3">
                {role.responsibilities.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[0.95rem] leading-relaxed"
                  >
                    <Check
                      size={17}
                      className="text-secondary mt-[0.2rem] shrink-0"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            {role.platforms && role.platforms.length > 0 && (
              <div className="border-border mt-6 border-t pt-5">
                <p className="text-muted mb-3 text-sm">Platforms</p>
                <ul className="flex flex-wrap gap-2.5">
                  {role.platforms.map((p) => (
                    <li
                      key={p}
                      className="bg-surface border-border rounded-full border px-3.5 py-1.5 text-sm"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        </Reveal>
      </div>
    </li>
  );
}

export function Experience() {
  return (
    <Section id="experience" decoration={<ExperienceDecoration />}>
      <Reveal>
        <SectionHeading
          eyebrow={experienceSection.eyebrow}
          title={experienceSection.heading}
          accent={experienceSection.headingAccent}
        />
      </Reveal>

      <ol className="mt-12 max-w-5xl">
        {roles.map((role, i) => (
          <TimelineItem
            key={role.id}
            role={role}
            isLast={i === roles.length - 1}
          />
        ))}
      </ol>
    </Section>
  );
}

function ExperienceDecoration() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div
        className="absolute -left-40 bottom-0 h-96 w-96 rounded-full blur-3xl"
        style={{
          background: "color-mix(in srgb, var(--primary) 12%, transparent)",
        }}
      />
    </div>
  );
}
