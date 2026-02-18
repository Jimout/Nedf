"use client";

import { Instagram, Linkedin } from "lucide-react";

const socialIcons = [
  { Icon: Instagram, label: "Instagram", href: "https://www.instagram.com/nedf_studios/" },
  { Icon: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z"/>
    </svg>
  ), label: "TikTok", href: "https://www.tiktok.com/@nedf_studios" },
  { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/nedfstudios" },
];

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#" },
  { label: "Portfolio", href: "#" },
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
];

const Footer = () => {
  return (
    <footer className="relative px-6 md:px-16 pt-12 pb-8">
      {/* Subtle top divider */}
      <div className="w-full h-px mb-10" style={{ background: "hsla(0,0%,100%,0.15)" }} />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Logo + tagline */}
        <div className="flex flex-col gap-1">
          <h3
            className="text-2xl font-extrabold tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "hsla(0,0%,100%,0.95)" }}
          >
            NEDF
          </h3>
          <p className="text-xs italic" style={{ color: "hsla(0,0%,100%,0.5)" }}>
            Less, but Better.
          </p>
        </div>

        {/* Nav links */}
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm transition-colors duration-200"
              style={{
                fontFamily: "var(--font-body)",
                color: "hsla(0,0%,100%,0.6)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "hsla(0,0%,100%,0.95)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "hsla(0,0%,100%,0.6)")}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Contact info */}
        <div className="flex flex-col gap-2 text-sm" style={{ color: "hsla(0,0%,100%,0.6)" }}>
          <div className="flex flex-wrap items-center gap-x-1">
            <span>Call:</span>
            <a href="tel:+251945289012" className="hover:underline" style={{ color: "hsla(0,0%,100%,0.85)" }}>+251945289012</a>
            <span>/</span>
            <a href="tel:+251900672518" className="hover:underline" style={{ color: "hsla(0,0%,100%,0.85)" }}>+251900672518</a>
          </div>
          <a href="mailto:Nedf123@gmail.com" className="hover:underline" style={{ color: "hsla(0,0%,100%,0.85)" }}>
            Nedf123@gmail.com
          </a>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-3">
          {socialIcons.map(({ Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                background: "hsla(0,0%,100%,0.12)",
                color: "hsla(0,0%,100%,0.7)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "hsla(0,0%,100%,0.25)";
                e.currentTarget.style.color = "hsla(0,0%,100%,1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "hsla(0,0%,100%,0.12)";
                e.currentTarget.style.color = "hsla(0,0%,100%,0.7)";
              }}
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="max-w-6xl mx-auto mt-10 pt-6" style={{ borderTop: "1px solid hsla(0,0%,100%,0.1)" }}>
        <p className="text-xs text-center" style={{ color: "hsla(0,0%,100%,0.35)", fontFamily: "var(--font-body)" }}>
          © 2025 NEDF. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
