import { Mail, MapPin, MessageCircle } from "lucide-react";
import type { ReactNode } from "react";
import { ContactForm } from "@/components/contact/ContactForm";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contactConfig, contactSection, whatsappLink } from "@/data/contact";
import { profile, socials } from "@/data/profile";

type Detail = {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
  icon: ReactNode;
};

const details: Detail[] = [
  ...(contactConfig.email
    ? [
        {
          label: "Email",
          value: contactConfig.email,
          href: `mailto:${contactConfig.email}`,
          icon: <Mail size={19} />,
        },
      ]
    : []),
  ...(contactConfig.whatsapp
    ? [
        {
          label: "WhatsApp",
          value: contactConfig.whatsapp,
          href: whatsappLink(contactConfig.whatsapp),
          external: true,
          icon: <MessageCircle size={19} />,
        },
      ]
    : []),
  {
    label: "GitHub",
    value: "github.com/Raza1631",
    href: socials.github,
    external: true,
    icon: <GithubIcon size={19} />,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/raza-ahmed-web",
    href: socials.linkedin,
    external: true,
    icon: <LinkedinIcon size={19} />,
  },
  {
    label: "Location",
    value: profile.location,
    icon: <MapPin size={19} />,
  },
];

export function Contact() {
  return (
    <Section id="contact" decoration={<ContactDecoration />}>
      <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <Reveal>
            <SectionHeading
              eyebrow={contactSection.eyebrow}
              title={contactSection.heading}
              accent={contactSection.headingAccent}
            />
          </Reveal>

          <Reveal delay={0.1} className="mt-6">
            <p className="text-muted max-w-lg text-base leading-relaxed sm:text-lg">
              {contactSection.description}
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-10">
            <ul className="space-y-3">
              {details.map((d) => {
                const content = (
                  <>
                    <span className="bg-surface text-primary border-border group-hover:text-secondary flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors">
                      {d.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="text-muted block text-xs">
                        {d.label}
                      </span>
                      <span className="block truncate text-[0.95rem]">
                        {d.value}
                      </span>
                    </span>
                  </>
                );
                const classes = "group flex items-center gap-4 rounded-2xl";
                return (
                  <li key={d.label}>
                    {d.href ? (
                      <a
                        href={d.href}
                        {...(d.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className={`${classes} hover:text-secondary transition-colors`}
                      >
                        {content}
                      </a>
                    ) : (
                      <div className={classes}>{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}

function ContactDecoration() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="bg-dots absolute inset-0 opacity-50 [mask-image:radial-gradient(55%_55%_at_85%_40%,black,transparent)]" />
      <div
        className="absolute -left-40 bottom-0 h-96 w-96 rounded-full blur-3xl"
        style={{
          background: "color-mix(in srgb, var(--primary) 13%, transparent)",
        }}
      />
    </div>
  );
}
