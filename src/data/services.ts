import {
  Bug,
  Cable,
  CreditCard,
  DatabaseZap,
  Puzzle,
  Server,
  Webhook,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
};

export type ProcessStep = {
  /** Display number, for example "01". */
  number: string;
  title: string;
  description: string;
};

export const servicesSection = {
  eyebrow: "Services",
  heading: "How I Can Help",
  headingAccent: "Your Business.",
  cta: "Get in touch",
  ctaHref: "#contact",
} as const;

export const processSection = {
  eyebrow: "Process",
  heading: "My Development",
  headingAccent: "Approach.",
  cta: "Start a conversation",
  ctaHref: "#contact",
} as const;

export const services: Service[] = [
  {
    id: "laravel-backend",
    icon: Server,
    title: "Laravel Backend Development",
    description:
      "Building and maintaining Laravel applications with clean structure and dependable backend logic.",
  },
  {
    id: "rest-api",
    icon: Webhook,
    title: "REST API Development",
    description:
      "Designing and building REST APIs with authentication and well-organized endpoints.",
  },
  {
    id: "bug-fixing",
    icon: Bug,
    title: "Laravel Bug Fixing",
    description:
      "Tracing, diagnosing and fixing issues in existing Laravel applications.",
  },
  {
    id: "payment-gateway",
    icon: CreditCard,
    title: "Payment Gateway Integration",
    description:
      "Integrating payment gateways into web applications to support online orders.",
  },
  {
    id: "mysql-optimization",
    icon: DatabaseZap,
    title: "MySQL Database Optimization",
    description:
      "Improving database structure and queries to help your application run faster.",
  },
  {
    id: "maintenance",
    icon: Wrench,
    title: "Website Maintenance",
    description:
      "Ongoing updates, fixes and improvements to keep your website running smoothly.",
  },
  {
    id: "third-party-api",
    icon: Puzzle,
    title: "Third-Party API Integration",
    description: "Connecting your application with external services and APIs.",
  },
  {
    id: "nextjs-api",
    icon: Cable,
    title: "Next.js Backend API Integration",
    description:
      "Connecting Next.js front ends to backend APIs for reliable data flow.",
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery",
    description: "Understand business requirements.",
  },
  {
    number: "02",
    title: "Planning",
    description: "Define the architecture and technical solution.",
  },
  {
    number: "03",
    title: "Development",
    description: "Build reliable and maintainable functionality.",
  },
  {
    number: "04",
    title: "Delivery",
    description: "Test, deploy, and provide support.",
  },
];
