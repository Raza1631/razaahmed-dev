import { ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { Container } from "@/components/ui/Container";
import { navLinks } from "@/data/navigation";
import { profile, socials } from "@/data/profile";
import { CurrentYear } from "./CurrentYear";

const socialLinks = [
  { label: "GitHub", href: socials.github, icon: GithubIcon },
  { label: "LinkedIn", href: socials.linkedin, icon: LinkedinIcon },
];

export function Footer() {
  return (
    <footer className="border-border bg-surface/50 border-t">
      <Container className="py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <a
              href="#home"
              className="text-[0.95rem] font-semibold tracking-[0.18em]"
            >
              RAZA AHMED
            </a>
            <p className="text-muted mt-2 text-sm">{profile.title}</p>

            <ul className="mt-5 flex items-center gap-2">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${profile.name} on ${label}`}
                    className="border-border bg-card text-muted hover:text-foreground flex h-10 w-10 items-center justify-center rounded-xl border transition-colors hover:border-[color-mix(in_srgb,var(--foreground)_30%,var(--border))]"
                  >
                    <Icon size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-muted hover:text-foreground text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="border-border text-muted mt-10 flex flex-col gap-4 border-t pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p>
              © <CurrentYear /> {profile.name}. All rights reserved.
            </p>
            <p>Designed and developed with passion by {profile.name}.</p>
          </div>
          <a
            href="#home"
            className="hover:text-foreground flex items-center gap-1.5 self-start transition-colors sm:self-auto"
          >
            Back to top <ArrowUp size={15} />
          </a>
        </div>
      </Container>
    </footer>
  );
}
