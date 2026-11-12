import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about } from "@/data/about";
import { profile } from "@/data/profile";

/** Soft glow and a faded dot grid behind the section. */
function AboutDecoration() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="bg-dots absolute inset-0 opacity-60 [mask-image:radial-gradient(60%_60%_at_80%_50%,black,transparent)]" />
      <div
        className="absolute -left-40 top-1/3 h-96 w-96 rounded-full blur-3xl"
        style={{
          background: "color-mix(in srgb, var(--primary) 14%, transparent)",
        }}
      />
    </div>
  );
}

export function About() {
  const [lead, ...rest] = about.paragraphs;

  return (
    <Section id="about" decoration={<AboutDecoration />}>
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16 xl:gap-24">
        {/* Text column */}
        <div>
          <Reveal>
            <SectionHeading
              eyebrow={about.eyebrow}
              title={about.heading}
              accent={about.headingAccent}
            />
          </Reveal>

          <Reveal delay={0.1} className="mt-8">
            <p className="text-foreground text-lg leading-relaxed sm:text-xl">
              {lead}
            </p>
            <div className="text-muted mt-5 space-y-5 text-base leading-relaxed sm:text-lg">
              {rest.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>

          <Reveal
            delay={0.2}
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4"
          >
            <Button href="#contact" variant="secondary">
              Let&apos;s Talk <ArrowRight size={18} />
            </Button>
            <p className="text-muted flex items-center gap-2 text-sm">
              <MapPin size={16} className="text-secondary" />
              Based in {profile.location}
            </p>
          </Reveal>
        </div>

        {/* Highlight cards */}
        <ul className="grid gap-4 sm:grid-cols-2">
          {about.highlights.map((item, i) => {
            const Icon = item.icon;
            const stat =
              "stat" in item && typeof item.stat === "string"
                ? item.stat
                : undefined;
            return (
              <li key={item.title} className="flex">
                <Reveal delay={0.1 + i * 0.08} className="flex w-full">
                  <div className="card hover:border-primary/50 flex w-full flex-col gap-5 p-6 transition-colors">
                    <span className="bg-surface text-primary border-border flex h-11 w-11 items-center justify-center rounded-xl border">
                      <Icon size={20} />
                    </span>
                    <div>
                      {stat && (
                        <p className="gradient-text text-4xl leading-none font-semibold">
                          {stat}
                        </p>
                      )}
                      <h3
                        className={
                          stat
                            ? "mt-2 text-base font-medium text-balance"
                            : "text-lg leading-snug font-medium text-balance"
                        }
                      >
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
