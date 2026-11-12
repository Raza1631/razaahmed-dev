import {
  Building2,
  Network,
  Scale,
  ShoppingBag,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";

export type Project = {
  id: string;
  title: string;
  description: string;
  features: string[];
  technologies: string[];
  icon: LucideIcon;
  /** Colour used in the representative visual. */
  accent: "primary" | "secondary";
  /** Wide card on large screens. */
  featured?: boolean;
  /**
   * Path to a real screenshot in /public (for example "/projects/my-project.jpg").
   * While the file is missing, a clearly labelled representative visual is shown.
   */
  screenshot?: string;
  /** Only add real, public links. Buttons appear in the details modal when set. */
  liveUrl?: string;
  repoUrl?: string;
};

export const projectsSection = {
  eyebrow: "Projects",
  heading: "Projects That Showcase",
  headingAccent: "My Work.",
  visualNote:
    "Visuals marked “Representative” are illustrations, not screenshots of the actual applications.",
} as const;

export const projects: Project[] = [
  {
    id: "multi-vendor-ecommerce",
    title: "Multi-Vendor E-commerce Platform",
    description:
      "A multi-vendor e-commerce platform covering vendor management, country-based pricing, multiple payment integrations and order management, exposed through REST APIs.",
    features: [
      "Multi-vendor management.",
      "Country-based pricing.",
      "Multiple payment integrations.",
      "Order management.",
      "REST APIs.",
    ],
    technologies: ["Laravel", "PHP", "MySQL"],
    icon: ShoppingBag,
    accent: "primary",
    featured: true,
    screenshot: "/projects/multi-vendor-ecommerce.jpg",
  },
  {
    id: "property-management-system",
    title: "Property Management System",
    description:
      "A property management system for managing properties and customers, with structured database relationships and administration tools.",
    features: [
      "Property management.",
      "Customer management.",
      "Database relationships.",
      "Administration.",
    ],
    technologies: ["Laravel", "PHP", "MySQL"],
    icon: Building2,
    accent: "secondary",
    screenshot: "/projects/property-management-system.jpg",
  },
  {
    id: "law-management-system",
    title: "Law Management System",
    description:
      "A law management system for organizing cases, client records and day-to-day legal operations.",
    features: [
      "Case management.",
      "Client records.",
      "Legal operations management.",
    ],
    technologies: ["Laravel", "PHP", "MySQL"],
    icon: Scale,
    accent: "primary",
    screenshot: "/projects/law-management-system.jpg",
  },
  {
    id: "doctor-appointment-app",
    title: "Doctor Appointment Application",
    description:
      "A doctor appointment application with appointment scheduling, user management, API integration and calling functionality.",
    features: [
      "Appointment scheduling.",
      "User management.",
      "API integration.",
      "Calling functionality.",
    ],
    technologies: ["Laravel", "PHP", "MySQL", "APIs"],
    icon: Stethoscope,
    accent: "secondary",
    screenshot: "/projects/doctor-appointment-app.jpg",
  },
  {
    id: "property-crm-api",
    title: "Property CRM API",
    description:
      "A property CRM backend that provides REST APIs with API authentication, database management and structured backend services.",
    features: [
      "REST APIs.",
      "API authentication.",
      "Database management.",
      "Structured backend services.",
    ],
    technologies: ["Laravel", "PHP", "MySQL"],
    icon: Network,
    accent: "primary",
    screenshot: "/projects/property-crm-api.jpg",
  },
];
