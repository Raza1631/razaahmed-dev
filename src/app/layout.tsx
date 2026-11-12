import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { profile, siteConfig, socials } from "@/data/profile";
import { MotionProvider } from "@/components/layout/MotionProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
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
  },
  twitter: {
    card: "summary",
    title: siteConfig.title,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
};

// Applies a saved theme before first paint. Dark is the default.
const themeScript = `try{var t=localStorage.getItem("theme");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  const personStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Karachi",
      addressCountry: "PK",
    },
    url: siteConfig.url,
    sameAs: [socials.github, socials.linkedin],
    knowsAbout: ["Laravel", "PHP", "REST API development", "Backend development"],
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
            __html: JSON.stringify(personStructuredData).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="flex min-h-dvh flex-col">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
