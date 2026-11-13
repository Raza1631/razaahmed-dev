import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSection, processSteps } from "@/data/services";

export function Process() {
  return (
    <Section id="process">
      <Reveal>
        <SectionHeading
          eyebrow={processSection.eyebrow}
          title={processSection.heading}
          accent={processSection.headingAccent}
        />
      </Reveal>

      <ol className="mt-12 grid gap-y-8 lg:grid-cols-4 lg:gap-x-6">
        {processSteps.map((step, i) => {
          const isLast = i === processSteps.length - 1;
          return (
            <li key={step.number} className="relative">
              <Reveal delay={i * 0.1}>
                <div className="group flex gap-5 lg:flex-col lg:gap-6">
                  <span className="bg-card border-border group-hover:border-primary/60 relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border transition-colors duration-300">
                    <span className="gradient-text font-mono text-lg font-semibold">
                      {step.number}
                    </span>
                  </span>

                  <div className="pt-1 lg:pt-0">
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                    <p className="text-muted mt-2 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Connectors: vertical on small screens, horizontal on large */}
              {!isLast && (
                <>
                  <span
                    aria-hidden="true"
                    className="bg-border absolute top-14 -bottom-8 left-7 w-px lg:hidden"
                  />
                  <span
                    aria-hidden="true"
                    className="from-primary/60 to-border absolute top-7 left-[4.25rem] hidden h-px bg-gradient-to-r lg:block"
                    style={{ width: "calc(100% - 3.5rem)" }}
                  />
                </>
              )}
            </li>
          );
        })}
      </ol>

      <Reveal delay={0.2} className="mt-12">
        <Button href={processSection.ctaHref}>
          {processSection.cta} <ArrowRight size={18} />
        </Button>
      </Reveal>
    </Section>
  );
}
