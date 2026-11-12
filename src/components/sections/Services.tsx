"use client";

import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services, servicesSection } from "@/data/services";
import { trackPointer } from "@/lib/pointer";

export function Services() {
  return (
    <Section id="services" decoration={<ServicesDecoration />}>
      <Reveal>
        <SectionHeading
          eyebrow={servicesSection.eyebrow}
          title={servicesSection.heading}
          accent={servicesSection.headingAccent}
        />
      </Reveal>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <li key={service.id} className="flex">
              <Reveal delay={(i % 4) * 0.07} className="flex w-full">
                <article
                  onMouseMove={trackPointer}
                  className="card group hover:border-primary/50 relative flex h-full w-full flex-col overflow-hidden p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1"
                >
                  {/* Pointer spotlight */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(240px circle at var(--mx, 50%) var(--my, 0%), color-mix(in srgb, var(--primary) 14%, transparent), transparent 70%)",
                    }}
                  />

                  <span className="bg-surface text-primary border-border group-hover:bg-primary group-hover:text-on-primary group-hover:border-primary relative flex h-12 w-12 items-center justify-center rounded-xl border transition-colors duration-300">
                    <Icon size={22} />
                  </span>

                  <h3 className="relative mt-6 text-lg leading-snug font-semibold text-balance">
                    {service.title}
                  </h3>
                  <p className="text-muted relative mt-3 leading-relaxed">
                    {service.description}
                  </p>

                  <a
                    href={servicesSection.ctaHref}
                    aria-label={`${servicesSection.cta} about ${service.title}`}
                    className="text-foreground hover:text-secondary relative mt-auto flex items-center gap-1.5 self-start pt-6 text-sm font-medium transition-colors"
                  >
                    {servicesSection.cta}
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </a>
                </article>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

function ServicesDecoration() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div
        className="absolute -left-40 top-1/4 h-96 w-96 rounded-full blur-3xl"
        style={{
          background: "color-mix(in srgb, var(--primary) 12%, transparent)",
        }}
      />
    </div>
  );
}
