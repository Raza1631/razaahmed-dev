export const profile = {
  name: "Raza Ahmed",
  title: "Laravel Backend Developer",
  location: "Karachi, Pakistan",
  tagline:
    "I build reliable Laravel applications, REST APIs, and backend systems.",
  shortBio:
    "Raza Ahmed is a Laravel Backend Developer and PHP Developer in Pakistan, based in Karachi. He builds REST APIs and takes on freelance Laravel projects.",
} as const;

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://razaahmed.vercel.app";

export const siteConfig = {
  title: `Laravel Developer in Karachi | ${profile.name}`,
  description: profile.shortBio,
  url: siteUrl,
  keywords: [
    "Laravel Developer in Karachi",
    "Laravel Developer Pakistan",
    "PHP Developer Karachi",
    "Laravel Backend Developer",
    "REST API Developer Karachi",
    "Freelance Laravel Developer",
    "MySQL Developer Pakistan",
  ],
} as const;

export const socials = {
  github: "https://github.com/Raza1631",
  linkedin: "https://www.linkedin.com/in/raza-ahmed-web/",
} as const;

export const assets = {
  photo: "/images/RazaAhmed.webp",
  ogImage: "/images/og-image.jpg", // ← create this image (1200×630)
  resume: "/resume.pdf",
} as const;
