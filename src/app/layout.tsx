import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { profile, siteConfig, socials } from "@/data/profile";
import { MotionProvider } from "@/components/layout/MotionProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${profile.name}`,
  },
  description: siteConfig.description,
  image:siteConfig.image,
  keywords: [...siteConfig.keywords],
  authors: [{ name: profile.name, url: siteConfig.url }],
  creator: profile.name,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "/",
    siteName: profile.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: "/images/RazaAhmed.webp", // or better: create a dedicated 1200x630 og image
        width: 1200,
        height: 630,
        alt: `${profile.name} – Laravel Backend Developer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/images/RazaAhmed.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

// Applies a saved theme before first paint. Dark is the default.
const themeScript = `try{var t=localStorage.getItem("theme");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: profile.name,
        jobTitle: profile.title,
        description: siteConfig.description,
        image: `${siteConfig.url}/images/RazaAhmed.webp`,
        url: siteConfig.url,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Karachi",
          addressRegion: "Sindh",
          addressCountry: "PK",
        },
        sameAs: [socials.github, socials.linkedin],
        knowsAbout: [
          "Laravel",
          "PHP",
          "REST API development",
          "Backend development",
          "MySQL",
          "CodeIgniter",
          "Node.js",
        ],
        worksFor: {
          "@type": "Organization",
          name: "ARY Services Limited",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.title,
        description: siteConfig.description,
        publisher: {
          "@id": `${siteConfig.url}/#person`,
        },
        inLanguage: "en-PK",
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#service`,
        name: "Laravel Backend Development Services",
        url: siteConfig.url,
        description: siteConfig.description,
        provider: {
          "@id": `${siteConfig.url}/#person`,
        },
        areaServed: {
          "@type": "City",
          name: "Karachi",
        },
        serviceType: [
          "Laravel Backend Development",
          "REST API Development",
          "MySQL Database Optimization",
          "Payment Gateway Integration",
          "Laravel Bug Fixing",
          "Website Maintenance",
        ],
      },
    ],
  };

  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="flex min-h-dvh flex-col">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
