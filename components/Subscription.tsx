 "use client";

import { useEffect, useState } from "react";
import { Send, Linkedin, Instagram, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  loadSubscription,
  type SubscriptionData,
} from "@/lib/landing-subscription";
import { ROUTES } from "@/lib/constants";

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

export default function Footer() {
  const [data, setData] = useState<SubscriptionData | null>(null);

  useEffect(() => {
    setData(loadSubscription());
  }, []);

  if (!data) return null;

  return (
    <footer
      id="footer"
      className="bg-footer text-footer-foreground border-t-2 border-footer-border 2xl:w-screen 2xl:relative 2xl:left-1/2 2xl:-ml-[50vw] px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 3xl:px-20 4xl:px-24"
    >
      {/* Main content - single horizontal padding to align with other sections */}
      <div className="w-full py-12 sm:py-14 md:py-16 lg:py-16 xl:py-20 2xl:py-28 3xl:py-32 4xl:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-14 lg:gap-16 xl:gap-16 2xl:gap-24 3xl:gap-28 4xl:gap-32 items-start">
          {/* Left column - logo, slogan, subscription aligned left */}
          <div className="space-y-6 sm:space-y-8 md:space-y-8 2xl:space-y-12 3xl:space-y-14 4xl:space-y-16 text-left">
            {/* Logo (same as nav, larger in footer) */}
            <Link href="/" className="inline-block">
              <Image
                src={data.logoLight}
                alt="NEDF Studio"
                width={280}
                height={90}
                className="w-[130px] h-auto sm:w-[150px] md:w-[170px] lg:w-[190px] xl:w-[210px] 2xl:w-[280px] 3xl:w-[320px] 4xl:w-[360px] dark:hidden"
              />
              <Image
                src={data.logoDark}
                alt="NEDF Studio"
                width={280}
                height={90}
                className="w-[130px] h-auto sm:w-[150px] md:w-[170px] lg:w-[190px] xl:w-[210px] 2xl:w-[280px] 3xl:w-[320px] 4xl:w-[360px] hidden dark:block"
              />
            </Link>

            {/* Newsletter form */}
            <div className="space-y-3 sm:space-y-4 2xl:space-y-5 3xl:space-y-6 4xl:space-y-6 max-w-md w-full text-left">
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                <input
                  type="email"
                  placeholder={data.newsletter.placeholder}
                  className="flex-1 min-w-0 px-3 py-2.5 sm:px-4 sm:py-3 2xl:px-5 2xl:py-4 3xl:px-6 3xl:py-4 4xl:px-6 4xl:py-5 text-sm sm:text-base 2xl:text-lg 3xl:text-xl 4xl:text-xl bg-footer-input text-footer-foreground placeholder:text-footer-muted border border-footer-border focus:outline-none focus:ring-1 focus:ring-footer-accent"
                />
                <button className="px-4 py-2.5 sm:px-5 sm:py-3 2xl:px-8 2xl:py-4 3xl:px-9 3xl:py-4 4xl:px-10 4xl:py-5 bg-primary text-primary-foreground text-sm sm:text-base 2xl:text-lg 3xl:text-xl 4xl:text-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shrink-0">
                  <Send className="w-4 h-4 sm:w-4 sm:h-4 2xl:w-5 2xl:h-5 3xl:w-6 3xl:h-6 4xl:w-6 4xl:h-6" />
                  {data.newsletter.buttonLabel}
                </button>
              </div>
              <p className="text-xs sm:text-sm 2xl:text-base 3xl:text-lg 4xl:text-lg text-footer-muted">
                {data.newsletter.description}
              </p>
            </div>
          </div>

          {/* Right column: Quick Links | Contact side by side, Connect With Us below */}
          <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 2xl:gap-14 3xl:gap-16 4xl:gap-20">
            {/* Row 1: Quick Links and Contact side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-10 2xl:gap-14 3xl:gap-16 4xl:gap-20">
              <div>
                <h3 className="font-display text-base sm:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-2xl font-semibold text-footer-accent mb-3 sm:mb-4 2xl:mb-5 3xl:mb-6 4xl:mb-6">
                  Quick Links
                </h3>
                <ul className="space-y-2 2xl:space-y-3 3xl:space-y-3 4xl:space-y-4">
                  {data.quickLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-footer-muted hover:text-footer-foreground transition-colors text-sm 2xl:text-base 3xl:text-lg 4xl:text-lg"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-display text-base sm:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-2xl font-semibold text-footer-accent mb-3 sm:mb-4 2xl:mb-5 3xl:mb-6 4xl:mb-6">
                  Contact
                </h3>
                <ul className="space-y-2 2xl:space-y-3 3xl:space-y-3 4xl:space-y-4 text-sm 2xl:text-base 3xl:text-lg 4xl:text-lg text-footer-muted">
                  <li>
                    <a
                      href={`mailto:${data.contact.email}`}
                      className="hover:text-footer-foreground transition-colors"
                    >
                      {data.contact.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${data.contact.phonePrimary}`}
                      className="hover:text-footer-foreground transition-colors"
                    >
                      {data.contact.phonePrimary}
                    </a>
                  </li>
                  <li>
                    <a
                      href={`tel:${data.contact.phoneSecondary}`}
                      className="hover:text-footer-foreground transition-colors"
                    >
                      {data.contact.phoneSecondary}
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Row 2: Connect With Us Online (full width under Quick Links & Contact) */}
            <div>
              <h3 className="font-display text-base sm:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-2xl font-semibold text-footer-foreground mb-3 sm:mb-4 2xl:mb-5 3xl:mb-6 4xl:mb-6">
                Connect With Us Online
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 2xl:gap-5 3xl:gap-6 4xl:gap-6">
                {[
                  { name: "LinkedIn", href: data.social.linkedin, Icon: Linkedin },
                  { name: "Instagram", href: data.social.instagram, Icon: Instagram },
                  { name: "TikTok", href: data.social.tiktok, Icon: TiktokIcon },
                  { name: "X", href: data.social.x, Icon: XIcon },
                  { name: "YouTube", href: data.social.youtube, Icon: Youtube },
                ]
                  .filter((item) => item.href)
                  .map(({ name, href, Icon }) => (
                  <a
                    key={name}
                    href={href!}
                    aria-label={name}
                    className="flex items-center justify-center min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] 2xl:min-w-[56px] 2xl:min-h-[56px] 3xl:min-w-[60px] 3xl:min-h-[60px] 4xl:min-w-[64px] 4xl:min-h-[64px] rounded-full border border-footer-border text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="w-5 h-5 2xl:w-6 2xl:h-6 3xl:w-6 3xl:h-6 4xl:w-7 4xl:h-7" />
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
      <div className="w-full py-5 sm:py-6 md:py-6 lg:py-7 2xl:py-10 3xl:py-12 4xl:py-14">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-xs 2xl:text-base 3xl:text-lg 4xl:text-lg text-footer-muted">
          {/* Policy links */}
          <div className="flex flex-wrap gap-3 2xl:gap-4 3xl:gap-5 4xl:gap-5">
            {data.policyLinks.map((link) => {
              // Ensure policy links always point to the correct pages (fixes old saved "#" hrefs)
              const href =
                link.label === "Privacy Policy" && (link.href === "#" || !link.href)
                  ? ROUTES.PRIVACY_POLICY
                  : link.label === "Terms and Conditions" && (link.href === "#" || !link.href)
                    ? ROUTES.TERMS_AND_CONDITIONS
                    : link.href;
              const isInternal = href.startsWith("/");
              return isInternal ? (
                <Link
                  key={link.label}
                  href={href}
                  className="hover:text-footer-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={href}
                  className="hover:text-footer-foreground transition-colors"
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <p>{data.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
