"use client";
import { useState, useEffect } from "react";
import { personalInfo } from "@/lib/portfolioData";

const navLinks = [
  { label: "Projects", href: "projects" },
  { label: "Skills", href: "engineering-stack" },
  { label: "Experience", href: "experience-education" },
  { label: "About", href: "about" },
  { label: "Contact", href: "contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("projects");
  const [scrolled, setScrolled] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = [...navLinks.map((l) => l.href), "ask-assistant", "ragbench-sandbox"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.4)]"
          : "bg-surface-container-lowest/60 backdrop-blur-md"
      }`}
    >
      <div className="h-16 md:h-20 w-full max-w-[1440px] mx-auto px-gutter flex items-center justify-between gap-space-md">
        {/* Logo */}
        <div className="flex items-center gap-space-sm shrink-0">
          <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center shadow-[0_0_16px_rgba(208,188,255,0.25)]">
            <span className="font-bold text-primary text-sm tracking-tight">JM</span>
          </div>
          <div className="hidden xl:flex flex-col">
            <span className="text-[13px] font-semibold text-on-surface tracking-wide">JEEBAN MOHANTY</span>
            <span className="text-[11px] text-secondary font-mono tracking-wider">// AI ENGINEER</span>
          </div>
          <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded bg-surface-container-low ml-2">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary shadow-[0_0_8px_#4edea3] animate-pulse" />
            <span className="text-[11px] text-on-surface-variant">{personalInfo.status}</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="hidden lg:flex items-center gap-space-md shrink-0">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className={`text-[13px] font-medium transition-colors ${
                activeSection === link.href
                  ? "text-primary font-semibold"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-space-sm shrink-0">
          <button
            onClick={() => scrollTo("ask-assistant")}
            className="flex items-center gap-1 px-3 py-2 rounded bg-surface-container-high text-secondary hover:bg-surface-container-highest hover:text-on-surface transition-all shadow-[0_0_12px_rgba(76,215,246,0.15)]"
          >
            <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
            <span className="hidden md:inline text-[11px] font-semibold">Ask Jeeban&apos;s AI</span>
          </button>
          <a
            href="/resume.pdf"
            className="flex items-center gap-1 px-3 py-2 rounded bg-primary text-on-primary hover:opacity-90 transition-all shadow-[0_0_16px_rgba(160,120,255,0.35)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span className="hidden sm:inline text-[11px] font-semibold">Resume</span>
          </a>
          <div className="flex items-center gap-1">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex items-center gap-1.5 px-3 py-2 rounded bg-surface-container-high text-on-surface hover:text-primary hover:bg-primary/10 hover:shadow-[0_0_12px_rgba(208,188,255,0.25)] transition-all duration-200"
            >
              <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="hidden sm:inline text-[11px] font-semibold">GitHub</span>
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex items-center gap-1.5 px-3 py-2 rounded bg-surface-container-high text-secondary hover:bg-secondary/10 hover:shadow-[0_0_12px_rgba(76,215,246,0.25)] transition-all duration-200"
            >
              <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current shrink-0" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span className="hidden sm:inline text-[11px] font-semibold">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
