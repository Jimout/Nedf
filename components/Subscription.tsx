import { Send } from "lucide-react";
import bakeryLogo from "@/assets/bakery-logo.png";

const quickLinks = [
  "Homepage",
  "About us",
  "Our Menu",
  "What we offer",
  "Testimonials",
];

const supportLinks = [
  "Contact Us",
  "FAQs",
  "Order Tracking",
  "Delivery Info",
  "Returns & Refunds",
];

const badges = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" />
        <path d="M12 20l6 6 10-12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    label: "NO ARTIFICIAL",
    sublabel: "COLORS ADDED",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" />
        <path d="M15 15l10 10M25 15l-10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    label: "NO CHEMICALS",
    sublabel: "IN OUR BAKES",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 8c-6 0-12 5-12 12s6 12 12 12 12-5 12-12-6-12-12-12z" stroke="currentColor" strokeWidth="2" />
        <path d="M20 14v8l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    label: "NO ARTIFICIAL",
    sublabel: "FLAVORS USED",
  },
];

const policyLinks = [
  "Privacy Policy",
  "Terms and Conditions",
  "Cookie Policy",
  "Allergen Information",
  "Nutritional Information",
];

const socialLinks = ["Facebook", "Instagram", "Pinterest"];

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
                TREAT IS A LITTLE
                <br />
                SLICE OF HEAVEN
              </h2>
            </div>

            {/* Newsletter form */}
            <div className="space-y-3 max-w-md">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-footer-input text-footer-foreground placeholder:text-footer-muted border border-footer-border rounded-l-md focus:outline-none focus:ring-1 focus:ring-footer-accent"
                />
                <button className="px-5 py-3 bg-footer-accent text-accent-foreground font-semibold rounded-r-md hover:opacity-90 transition-opacity flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Subscribe
                </button>
              </div>
              <p className="text-sm text-footer-muted">
                We won't flood your inbox, just sweet updates and offers!
              </p>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-10">
            {/* Nav columns */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="font-display text-lg font-semibold text-footer-accent mb-4">
                  Quick Links
                </h3>
                <ul className="space-y-2">
                  {quickLinks.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-footer-muted hover:text-footer-foreground transition-colors text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-display text-lg font-semibold text-footer-accent mb-4">
                  Customer Support
                </h3>
                <ul className="space-y-2">
                  {supportLinks.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-footer-muted hover:text-footer-foreground transition-colors text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Trust badges */}
            <div>
              <h3 className="font-display text-lg font-semibold text-footer-foreground mb-4">
                There is nothing to Hide!
              </h3>
              <div className="flex flex-wrap gap-6">
                {badges.map((badge, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="text-footer-accent">
                      {badge.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-footer-foreground tracking-wide">
                        {badge.label}
                      </p>
                      <p className="text-xs text-footer-muted tracking-wide">
                        {badge.sublabel}
                      </p>
                    </div>
                  </div>
                ))}
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
          <p>Design by Divi Pixel Copyright © 2025. All Rights Reserved.</p>

          {/* Social links */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a key={social} href="#" className="hover:text-footer-accent transition-colors">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
