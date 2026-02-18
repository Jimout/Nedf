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
    <footer className="relative px-6 md:px-16 pt-12 pb-8 bg-primary">
      {/* Subtle top divider */}
      <div className="w-full h-px mb-10 bg-primary-foreground/15" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Logo + tagline */}
        <div className="flex flex-col gap-1">
          <h3
            className="text-2xl font-extrabold tracking-tight text-primary-foreground/95"
            style={{ fontFamily: "var(--font-display)" }}
          >
            NEDF
          </h3>
          <p className="text-xs italic text-primary-foreground/50">
            Less, but Better.
          </p>
        </div>

        {/* Nav links */}
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-primary-foreground/60 hover:text-primary-foreground/95 transition-colors duration-200"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Contact info */}
        <div className="flex flex-col gap-2 text-sm text-primary-foreground/60">
          <div className="flex flex-wrap items-center gap-x-1">
            <span>Call:</span>
            <a href="tel:+251945289012" className="hover:underline text-primary-foreground/85">+251945289012</a>
            <span>/</span>
            <a href="tel:+251900672518" className="hover:underline text-primary-foreground/85">+251900672518</a>
          </div>
          <a href="mailto:Nedf123@gmail.com" className="hover:underline text-primary-foreground/85">
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
              className="w-9 h-9 rounded-full flex items-center justify-center bg-primary-foreground/12 text-primary-foreground/70 hover:bg-primary-foreground/25 hover:text-primary-foreground transition-all duration-200"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-primary-foreground/10">
        <p className="text-xs text-center text-primary-foreground/35" style={{ fontFamily: "var(--font-body)" }}>
          © 2025 NEDF. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
