import { Send, Linkedin, Instagram, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
  { label: "About", href: "/#TheCrew" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
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
    <footer
      id="footer"
      className="bg-footer text-footer-foreground border-t-2 border-footer-border 2xl:w-screen 2xl:relative 2xl:left-1/2 2xl:-ml-[50vw] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 3xl:px-20 4xl:px-24"
    >
      {/* Main content - single horizontal padding to align with other sections */}
      <div className="w-full py-12 sm:py-14 md:py-16 lg:py-16 xl:py-20 2xl:py-20 3xl:py-24 4xl:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-14 lg:gap-16 xl:gap-16 2xl:gap-20 3xl:gap-24 4xl:gap-28 items-start">
          {/* Left column - logo, slogan, subscription aligned left */}
          <div className="space-y-6 sm:space-y-8 md:space-y-8 2xl:space-y-10 3xl:space-y-10 4xl:space-y-12 text-left">
            {/* Logo (same as nav, larger in footer) */}
            <Link href="/" className="inline-block">
              <Image
                src="/NEDF TEXT BASED LOGO-14.png"
                alt="NEDF Studio"
                width={280}
                height={90}
                className="w-[130px] h-auto sm:w-[150px] md:w-[170px] lg:w-[190px] xl:w-[210px] 2xl:w-[240px] 3xl:w-[260px] 4xl:w-[280px] dark:hidden"
              />
              <Image
                src="/NEDF TEXT BASED LOGO-13.png"
                alt="NEDF Studio"
                width={280}
                height={90}
                className="w-[130px] h-auto sm:w-[150px] md:w-[170px] lg:w-[190px] xl:w-[210px] 2xl:w-[240px] 3xl:w-[260px] 4xl:w-[280px] hidden dark:block"
              />
            </Link>

            {/* Newsletter form */}
            <div className="space-y-3 sm:space-y-4 max-w-md w-full text-left">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 px-3 py-2.5 sm:px-4 sm:py-3 2xl:px-4 2xl:py-3 3xl:px-5 3xl:py-3.5 4xl:px-5 4xl:py-4 text-sm sm:text-base 2xl:text-base 3xl:text-base 4xl:text-lg bg-footer-input text-footer-foreground placeholder:text-footer-muted border border-footer-border focus:outline-none focus:ring-1 focus:ring-footer-accent"
                />
                <button className="px-4 py-2.5 sm:px-5 sm:py-3 2xl:px-6 2xl:py-3 3xl:px-7 3xl:py-3.5 4xl:px-8 4xl:py-4 bg-primary text-primary-foreground text-sm sm:text-base 2xl:text-base 3xl:text-base 4xl:text-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shrink-0">
                  <Send className="w-4 h-4 sm:w-4 sm:h-4 4xl:w-5 4xl:h-5" />
                  Subscribe
                </button>
              </div>
              <p className="text-xs sm:text-sm 2xl:text-sm 3xl:text-base 4xl:text-base text-footer-muted">
                We’ll only send updates worth your inbox. Projects, insights, and studio news.
              </p>
            </div>
          </div>

          {/* Right column: Quick Links | Contact side by side, Connect With Us below */}
          <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 2xl:gap-10 3xl:gap-12 4xl:gap-14">
            {/* Row 1: Quick Links and Contact side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10 2xl:gap-10 3xl:gap-12 4xl:gap-14">
              <div>
                <h3 className="font-display text-base sm:text-lg 2xl:text-lg 3xl:text-xl 4xl:text-xl font-semibold text-footer-accent mb-3 sm:mb-4">
                  Quick Links
                </h3>
                <ul className="space-y-2">
                  {quickLinks.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className="text-footer-muted hover:text-footer-foreground transition-colors text-sm 2xl:text-sm 3xl:text-base 4xl:text-base">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-base sm:text-lg 2xl:text-lg 3xl:text-xl 4xl:text-xl font-semibold text-footer-accent mb-3 sm:mb-4">
                  Contact
                </h3>
                <ul className="space-y-2 text-sm 2xl:text-sm 3xl:text-base 4xl:text-base text-footer-muted">
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

            {/* Row 2: Connect With Us Online (full width under Quick Links & Contact) */}
            <div>
              <h3 className="font-display text-base sm:text-lg 2xl:text-lg 3xl:text-xl 4xl:text-xl font-semibold text-footer-foreground mb-3 sm:mb-4">
                Connect With Us Online
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 2xl:gap-4 3xl:gap-5 4xl:gap-5">
                {connectSocialLinks.map(({ name, href, Icon }) => (
                  <a
                    key={name}
                    href={href}
                    aria-label={name}
                    className="flex items-center justify-center min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] 2xl:min-w-[44px] 2xl:min-h-[44px] 4xl:min-w-[48px] 4xl:min-h-[48px] rounded-full border border-footer-border text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="w-5 h-5 2xl:w-5 2xl:h-5 4xl:w-6 4xl:h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-footer-border" />

      {/* Bottom bar */}
      <div className="w-full py-5 sm:py-6 md:py-6 lg:py-7 2xl:py-8 3xl:py-10 4xl:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-xs 2xl:text-sm 3xl:text-sm 4xl:text-base text-footer-muted">
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
