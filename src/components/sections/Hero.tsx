"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import {
  RevealBlock,
  RevealWords,
  wordsContainer,
} from "@/components/ui/TextReveal";
import { profile, socials } from "@/data/profile";
import { ProfilePhoto } from "./ProfilePhoto";

type HeroProps = {
  photo: { src: string; available: boolean };
  resume: { href: string; download: boolean } | null;
};

const badges = [
  {
    label: "Laravel",
    color: "#f9322c",
    className: "left-2 top-8 sm:-left-6",
    delay: 0,
  },
  {
    label: "PHP",
    color: "#8892bf",
    className: "right-2 top-20 sm:-right-6",
    delay: 0.8,
  },
  {
    label: "MySQL",
    color: "#06b6d4",
    className: "bottom-24 left-2 sm:-left-8",
    delay: 1.4,
  },
  {
    label: "Next.js",
    color: "#fafafa",
    className: "bottom-8 right-2 sm:-right-4",
    delay: 0.4,
  },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export function Hero({ photo, resume }: HeroProps) {
  const resumeProps = resume
    ? resume.download
      ? ({ href: resume.href, download: true } as const)
      : ({ href: resume.href, external: true } as const)
    : null;

  return (
    <section id="home" className="bg-glow relative isolate overflow-hidden">
      {/* Slow background drift (larger screens, no reduced motion) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className="drift-a absolute -top-32 left-1/4 h-[26rem] w-[26rem] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in srgb, var(--primary) 20%, transparent), transparent)",
          }}
        />
        <div
          className="drift-b absolute top-1/4 -right-10 h-[24rem] w-[24rem] rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in srgb, var(--secondary) 14%, transparent), transparent)",
          }}
        />
      </div>

      <Container className="grid items-center gap-14 pt-28 pb-20 md:pt-32 lg:grid-cols-[1.3fr_1fr] lg:gap-12 lg:pt-36 lg:pb-24">
        {/* Left column */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl lg:max-w-none"
        >
          <motion.p
            variants={item}
            className="text-secondary text-sm font-medium tracking-[0.16em]"
          >
            HELLO, I&apos;M RAZA AHMED
          </motion.p>

          <motion.h1
            variants={wordsContainer}
            aria-label="Building Scalable Backend Systems & Modern Web Applications."
            className="mt-5 text-[2.5rem] leading-[1.05] font-semibold sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem]"
          >
            <span aria-hidden="true">
              <span className="block">
                <RevealWords text="Building Scalable Backend Systems" />
              </span>
              <RevealBlock className="gradient-text inline-block">
                &amp; Modern Web Applications.
              </RevealBlock>
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="text-muted mt-6 max-w-xl text-base leading-relaxed sm:text-lg"
          >
            I&apos;m a Laravel Developer in Karachi, Pakistan, building PHP
            applications and REST APIs. Available for freelance Laravel
            backend development and API projects.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <Button href="#projects">
              View My Projects <ArrowRight size={18} />
            </Button>
            <Button variant="secondary" href="#contact">
              Let&apos;s Work Together
            </Button>
            {resumeProps && (
              <Button variant="ghost" {...resumeProps}>
                <Download size={18} /> Download CV
              </Button>
            )}
          </motion.div>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4"
          >
            <ul className="flex items-center gap-2">
              <li>
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Raza Ahmed on GitHub"
                  className="border-border bg-card text-muted hover:text-foreground flex h-11 w-11 items-center justify-center rounded-xl border transition-colors hover:border-[color-mix(in_srgb,var(--foreground)_30%,var(--border))]"
                >
                  <GithubIcon size={19} />
                </a>
              </li>
              <li>
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Raza Ahmed on LinkedIn"
                  className="border-border bg-card text-muted hover:text-foreground flex h-11 w-11 items-center justify-center rounded-xl border transition-colors hover:border-[color-mix(in_srgb,var(--foreground)_30%,var(--border))]"
                >
                  <LinkedinIcon size={19} />
                </a>
              </li>
            </ul>

            <p className="text-muted flex items-center gap-2.5 text-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              Available for Freelance Projects
            </p>
          </motion.div>
        </motion.div>

        {/* Right column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:max-w-[28rem] lg:justify-self-end"
        >
          {/* Soft glow behind the frame */}
          <div
            aria-hidden="true"
            className="absolute -inset-6 -z-10 rounded-[2.5rem] opacity-70 blur-3xl"
            style={{
              background:
                "linear-gradient(135deg, color-mix(in srgb, var(--primary) 35%, transparent), color-mix(in srgb, var(--secondary) 25%, transparent))",
            }}
          />

          {/* Gradient frame */}
          <div
            className="rounded-[2rem] p-[1.5px]"
            style={{
              background:
                "linear-gradient(145deg, var(--primary), var(--border) 45%, var(--secondary))",
            }}
          >
            <div className="bg-card rounded-[calc(2rem-1.5px)] p-2.5">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem]">
                <ProfilePhoto src={photo.src} available={photo.available} />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, color-mix(in srgb, var(--background) 55%, transparent), transparent 40%)",
                  }}
                />
                <div className="absolute inset-x-4 bottom-4">
                  <p className="text-sm font-semibold text-white drop-shadow">
                    {profile.name}
                  </p>
                  <p className="text-xs text-white/80 drop-shadow">
                    {profile.title}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Floating technology badges: fade in once, then float with CSS (larger screens only) */}
          {badges.map((b, i) => (
            <motion.span
              key={b.label}
              aria-hidden="true"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.12 }}
              className={`absolute ${b.className}`}
            >
              <span
                className="float-y bg-card border-border flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium shadow-lg shadow-black/20"
                style={{ animationDelay: `${b.delay}s` }}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: b.color }}
                />
                {b.label}
              </span>
            </motion.span>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
