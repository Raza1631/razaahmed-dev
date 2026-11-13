import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects, projectsSection } from "@/data/projects";
import { publicFileExists } from "@/lib/assets";

export function Projects() {
  // Use a real screenshot only where the file exists in /public.
  const screenshots = Object.fromEntries(
    projects.map((p) => [
      p.id,
      p.screenshot ? publicFileExists(p.screenshot) : false,
    ]),
  );
  const hasPlaceholders = Object.values(screenshots).some((v) => !v);

  return (
    <Section id="projects" decoration={<ProjectsDecoration />}>
      <Reveal>
        <SectionHeading
          eyebrow={projectsSection.eyebrow}
          title={projectsSection.heading}
          accent={projectsSection.headingAccent}
        />
      </Reveal>

      <ProjectsGrid screenshots={screenshots} />

      {hasPlaceholders && (
        <p className="text-muted mt-8 text-sm">{projectsSection.visualNote}</p>
      )}
    </Section>
  );
}

function ProjectsDecoration() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="bg-dots absolute inset-0 opacity-50 [mask-image:radial-gradient(60%_50%_at_20%_30%,black,transparent)]" />
      <div
        className="absolute -right-40 top-1/3 h-96 w-96 rounded-full blur-3xl"
        style={{
          background: "color-mix(in srgb, var(--secondary) 10%, transparent)",
        }}
      />
    </div>
  );
}
