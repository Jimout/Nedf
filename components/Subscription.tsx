import { Send, Linkedin, Instagram, Youtube } from "lucide-react";
import bakeryLogo from "@/assets/bakery-logo.png";

/** TikTok logo as inline SVG (not in lucide) */
function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

/** X (Twitter) logo as inline SVG */
function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/#TheCrew" },
  { label: "Blog", href: "/blog" },
];

const moreLinks = [
  { label: "Contact", href: "/#footer" },
  { label: "Studio Notes", href: "/#studio-notes" },
];

const connectSocialLinks = [
  { name: "LinkedIn", href: "#", Icon: Linkedin },
  { name: "Instagram", href: "#", Icon: Instagram },
  { name: "TikTok", href: "#", Icon: TiktokIcon },
  { name: "X", href: "#", Icon: XIcon },
  { name: "YouTube", href: "#", Icon: Youtube },
];

const policyLinks = [
  "Privacy Policy",
  "Terms and Conditions",
];

export default function Footer() {
  return (
    <footer className="bg-footer text-footer-foreground">
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left column */}
          <div className="space-y-8">
            {/* Logo */}
           

            {/* Headline */}
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight text-footer-foreground">
                WHERE EVERY
                <br />
                IDEA BECOMES
                <br />
                A BUILT REALITY
              </h2>
            </div>

            {/* Newsletter form */}
            <div className="space-y-3 max-w-md">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-footer-input text-footer-foreground placeholder:text-footer-muted border border-footer-border focus:outline-none focus:ring-1 focus:ring-footer-accent"
                />
                <button className="px-5 py-3 bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-footer-muted">
                We won't flood your inbox, just sweet updates and offers!
              </p>
            </div>
          </div>

          {/* Right column - 2 columns only */}
          <div className="grid grid-cols-2 gap-8">
            {/* Column 1: Quick Links + Contact */}
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-lg font-semibold text-footer-accent mb-4">
                  Quick Links
                </h3>
                <ul className="space-y-2">
                  {quickLinks.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="text-footer-muted hover:text-footer-foreground transition-colors text-sm">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-footer-accent mb-4">
                  Contact
                </h3>
                <ul className="space-y-2 text-sm text-footer-muted">
                  <li>
                    <a href="mailto:Nedf123@gmail.com" className="hover:text-footer-foreground transition-colors">
                      Nedf123@gmail.com
                    </a>
                  </li>
                  <li>
                    <a href="tel:+251945289012" className="hover:text-footer-foreground transition-colors">
                      +251 945 289 012
                    </a>
                  </li>
                  <li>
                    <a href="tel:+251900672518" className="hover:text-footer-foreground transition-colors">
                      +251 900 672 518
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Column 2: More + Connect With Us Online */}
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-lg font-semibold text-footer-accent mb-4">
                  More
                </h3>
                <ul className="space-y-2">
                  {moreLinks.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="text-footer-muted hover:text-footer-foreground transition-colors text-sm">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-footer-foreground mb-4">
                  Connect With Us Online
                </h3>
                <div className="flex flex-wrap gap-4">
                  {connectSocialLinks.map(({ name, href, Icon }) => (
                    <a
                      key={name}
                      href={href}
                      aria-label={name}
                      className="text-primary hover:opacity-80 transition-opacity flex items-center justify-center w-8 h-8"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-footer-border" />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-footer-muted">
          {/* Policy links */}
          <div className="flex flex-wrap gap-3">
            {policyLinks.map((link) => (
              <a key={link} href="#" className="hover:text-footer-foreground transition-colors">
                {link}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p>© 2026 Nedf Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
