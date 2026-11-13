import {
  Briefcase,
  CalendarCheck,
  Plug,
  Server,
  type LucideIcon,
} from "lucide-react";

export type HighlightCard = {
  icon: LucideIcon;
  /** Optional large figure shown above the title. */
  stat?: string;
  title: string;
};

export const about = {
  eyebrow: "About Me",
  heading: "Turning Ideas Into",
  headingAccent: "Reliable Software.",
  paragraphs: [
    "Based in Karachi, Pakistan, I work as a Laravel Backend Developer and take on freelance projects involving PHP applications and REST APIs.",
    "My expertise includes backend application development, REST API architecture, MySQL database management, third-party integrations, and web application performance improvements.",
    "I enjoy developing reliable software solutions that solve real business problems.",
  ],
  highlights: [
    { icon: CalendarCheck, title: "Professional Development Experience" },
    { icon: Server, title: "Laravel\u00a0/\u00a0PHP Backend Development" },
    { icon: Briefcase, title: "Business Application Development" },
    { icon: Plug, title: "API Integration & Backend Engineering" },
  ] satisfies HighlightCard[],
};
