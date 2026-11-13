/**
 * Contact configuration. Values come from environment variables so nothing
 * personal is hard-coded. See `.env.example`.
 *
 * NEXT_PUBLIC_* variables are read at build time; restart `npm run dev` or
 * rebuild after changing them.
 */
export const contactConfig = {
  /** Where the form POSTs JSON. Leave empty until a backend is ready. */
  endpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "",
  /** Hidden until a real address is configured. */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  /** International format; hidden until a real number is configured. */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
} as const;

export const contactSection = {
  eyebrow: "Contact",
  heading: "Have a Project in Mind?",
  headingAccent: "Let’s Build Something Great.",
  description:
    "Have a Laravel project, API integration, or existing application that needs improvement? Let’s discuss how I can help.",
} as const;

/** Project types offered in the form, in addition to "Other". */
export const otherProjectType = "Other";

/** Digits only, as wa.me expects. */
export function whatsappLink(number: string) {
  return `https://wa.me/${number.replace(/\D/g, "")}`;
}
