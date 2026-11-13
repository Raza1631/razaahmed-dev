export const profile = {
  name: "Raza Ahmed",
  title: "Laravel Backend Developer",
  location: "Karachi, Pakistan",
  tagline:
    "I build reliable Laravel applications, REST APIs, and backend systems.",
} as const;

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.example";

export const siteConfig = {
  title: `Laravel Developer in Karachi | ${profile.name}`,
  description:
    "Raza Ahmed is a Laravel Backend Developer and PHP Developer in Pakistan, based in Karachi. He builds REST APIs and takes on freelance Laravel projects.",
  url: siteUrl,
  keywords: [
    "Laravel Developer in Karachi",
    "PHP Developer Pakistan",
    "Laravel Backend Developer",
    "REST API Developer",
    "Laravel Freelance Developer",
  ],
} as const;

export const socials = {
  github: "https://github.com/Raza1631",
  linkedin: "https://www.linkedin.com/in/raza-ahmed-web/",
} as const;

/** Files expected in /public. The site falls back gracefully if they are missing. */
export const assets = {
  photo: "/images/RazaAhmed.webp",
  resume: "/resume.pdf",
} as const;
