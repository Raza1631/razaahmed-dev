import {
  CalendarClock,
  Database,
  Gauge,
  KeyRound,
  LayoutTemplate,
  ListOrdered,
  Server,
  ShieldCheck,
  Webhook,
  Wrench,
  Boxes,
  Table2,
  type LucideIcon,
} from "lucide-react";

export type Skill = {
  name: string;
  /** Optional icon, used by the "tiles" layout. */
  icon?: LucideIcon;
};

export type SkillCategory = {
  id: string;
  title: string;
  icon: LucideIcon;
  /** "chips" for short technology names, "tiles" for capability lists with icons. */
  layout: "chips" | "tiles";
  skills: Skill[];
};

export const skillsSection = {
  eyebrow: "Technical Skills",
  heading: "Technologies",
  headingAccent: "I Work With.",
} as const;

export const skillCategories: SkillCategory[] = [
  {
    id: "backend",
    title: "Backend",
    icon: Server,
    layout: "chips",
    skills: [
      { name: "PHP" },
      { name: "Laravel" },
      { name: "CodeIgniter" },
      { name: "Node.js" },
      { name: "REST APIs" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    icon: LayoutTemplate,
    layout: "chips",
    skills: [
      { name: "Next.js" },
      { name: "React.js" },
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "HTML5" },
      { name: "CSS3" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    id: "database",
    title: "Database",
    icon: Database,
    layout: "chips",
    skills: [{ name: "MySQL" }, { name: "MongoDB" }],
  },
  {
    id: "laravel",
    title: "Laravel Expertise",
    icon: Boxes,
    layout: "tiles",
    skills: [
      { name: "Eloquent ORM", icon: Table2 },
      { name: "Authentication & Authorization", icon: ShieldCheck },
      { name: "Spatie Permissions", icon: KeyRound },
      { name: "Queue Management", icon: ListOrdered },
      { name: "Task Scheduling", icon: CalendarClock },
      { name: "API Development", icon: Webhook },
      { name: "Database Optimization", icon: Gauge },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    icon: Wrench,
    layout: "chips",
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Postman" },
      { name: "VS Code" },
      { name: "Composer" },
    ],
  },
];
