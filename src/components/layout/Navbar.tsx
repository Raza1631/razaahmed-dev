"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FileText, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { navLinks } from "@/data/navigation";
import { cn } from "@/lib/utils";

type NavbarProps = {
  resume: { href: string; download: boolean } | null;
};

export function Navbar({ resume }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  // Border + blur once the page scrolls.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom) setActive(navLinks[navLinks.length - 1].href);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the link for the section in view.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Close the mobile menu with Escape and lock page scroll while it is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Leave the mobile layout open state behind when the viewport grows.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Close the menu, release the scroll lock, then scroll to the section.
  function handleMobileMenuClick(e: React.MouseEvent<HTMLElement>) {
    const anchor = (e.target as HTMLElement).closest("a");
    if (!anchor) return;
    const href = anchor.getAttribute("href") ?? "";
    setOpen(false);
    if (!href.startsWith("#")) return;
    e.preventDefault();
    requestAnimationFrame(() => {
      document.querySelector(href)?.scrollIntoView();
      history.replaceState(null, "", href);
    });
  }

  const resumeProps = resume
    ? resume.download
      ? ({ href: resume.href, download: true } as const)
      : ({ href: resume.href, external: true } as const)
    : null;

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-border border-b backdrop-blur-xl"
          : "border-b border-transparent",
      )}
      style={{
        backgroundColor:
          scrolled || open
            ? "color-mix(in srgb, var(--background) 82%, transparent)"
            : "transparent",
      }}
    >
      <Container className="flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
        <a
          href="#home"
          onClick={() => setOpen(false)}
          className="text-[0.95rem] font-semibold tracking-[0.18em]"
          aria-label="Raza Ahmed, back to top"
        >
          RAZA AHMED
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative block rounded-lg px-3 py-2 text-sm transition-colors",
                      isActive
                        ? "text-foreground"
                        : "text-muted hover:text-foreground",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        aria-hidden="true"
                        className="bg-surface absolute inset-0 rounded-lg"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 34,
                        }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {resumeProps && (
            <Button
              {...resumeProps}
              variant="secondary"
              size="sm"
              className="hidden xl:inline-flex"
            >
              <FileText size={16} /> Resume
            </Button>
          )}
          <Button href="#contact" size="sm" className="hidden lg:inline-flex">
            Let&apos;s Talk
          </Button>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="btn btn-secondary h-10 w-10 !p-0 lg:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden lg:hidden"
          >
            <Container className="pt-2 pb-6">
              {/* One handler for every link in the mobile menu. */}
              <div onClick={handleMobileMenuClick}>
                <nav aria-label="Mobile">
                  <ul className="flex flex-col">
                    {navLinks.map((link, i) => (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 + i * 0.035, duration: 0.25 }}
                      >
                        <a
                          href={link.href}
                          aria-current={
                            active === link.href ? "location" : undefined
                          }
                          className={cn(
                            "border-border flex items-center justify-between border-b py-3.5 text-lg",
                            active === link.href
                              ? "text-foreground"
                              : "text-muted",
                          )}
                        >
                          {link.label}
                          {active === link.href && (
                            <span className="bg-primary h-1.5 w-1.5 rounded-full" />
                          )}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </nav>
                <div
                  className={cn(
                    "mt-6 grid gap-3",
                    resumeProps ? "grid-cols-2" : "grid-cols-1",
                  )}
                >
                  {resumeProps && (
                    <Button {...resumeProps} variant="secondary">
                      <FileText size={16} /> Resume
                    </Button>
                  )}
                  <Button href="#contact">Let&apos;s Talk</Button>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
