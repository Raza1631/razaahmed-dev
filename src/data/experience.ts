export type Role = {
  id: string;
  company: string;
  title: string;
  /**
   * Editable date fields, written as free text (for example "September 2025").
   * Leave both empty until the exact dates are confirmed.
   */
  startDate: string;
  /** A date, or "Present" for a current role. */
  endDate: string;
  current?: boolean;
  summary?: string;
  responsibilities?: string[];
  /** Platforms worked on. Keep this at product-name level only. */
  platforms?: string[];
};

export const experienceSection = {
  eyebrow: "Experience",
  heading: "My Professional",
  headingAccent: "Journey.",
} as const;

/** Newest first. */
export const roles: Role[] = [
  {
    id: "ary-services",
    company: "ARY Services Limited",
    title: "Laravel Developer",
    startDate: "September 2025",
    endDate: "Present",
    current: true,
    summary:
      "Developing and maintaining web applications across the ARY News, A-Sport and ARY Digital platform ecosystem.",
    responsibilities: [
      "Web application development and maintenance.",
      "API integrations.",
      "Backend/frontend coordination.",
      "Website performance improvements.",
      "Technical collaboration with development and SEO teams.",
    ],
    platforms: ["ARY News", "A-Sport", "ARY Digital"],
  },
  {
    id: "digital-graphiks",
    company: "Digital Graphiks",
    title: "Laravel Developer",
    startDate: "",
    endDate: "",
  },
];

/** Builds the display text for a role's dates. */
export function formatPeriod(role: Pick<Role, "startDate" | "endDate">) {
  const start = role.startDate.trim();
  const end = role.endDate.trim();
  if (!start && !end) return "";
  if (start && end) return `${start} – ${end}`;
  return start || end;
}
