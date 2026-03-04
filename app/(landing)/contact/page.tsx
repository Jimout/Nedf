"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, MapPin, Mail, Phone, Clock } from "lucide-react";
import { FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaTiktok, FaXTwitter } from "react-icons/fa6";
import {
  CONTACT_INFO,
  CONTACT_PAGE,
  CONTACT_FORM_LABELS,
  SOCIAL_LINKS,
  ROUTES,
} from "@/lib/constants";
import Subscription from "@/components/Subscription";
import { cn } from "@/lib/utils";

const SOCIAL_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  LinkedIn: FaLinkedin,
  Instagram: FaInstagram,
  TikTok: FaTiktok,
  X: FaXTwitter,
  YouTube: FaYoutube,
};

const CONTACT_CARDS = [
  {
    key: "address",
    label: "Address",
    value: CONTACT_INFO.address,
    icon: MapPin,
    href: null,
  },
  {
    key: "email",
    label: "Email",
    value: CONTACT_INFO.email,
    icon: Mail,
    href: `mailto:${CONTACT_INFO.email}`,
  },
  {
    key: "phone",
    label: "Phone",
    value: CONTACT_INFO.phone,
    icon: Phone,
    href: `tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`,
  },
  {
    key: "availability",
    label: "Availability",
    value: CONTACT_INFO.availability,
    icon: Clock,
    href: null,
  },
] as const;

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission can be wired to an API or action later
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="w-full py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-6 mb-10 sm:mb-12 md:mb-14">
          <Link
            href={ROUTES.HOME}
            className="inline-flex items-center justify-center text-foreground hover:text-primary transition-colors justify-self-start"
            aria-label="Back to home"
          >
            <ChevronLeft className="w-10 h-10 sm:w-12 sm:h-12" strokeWidth={0.75} />
          </Link>
          <header className="min-w-0 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">
              {CONTACT_PAGE.title}
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mt-3 mx-auto">
              {CONTACT_PAGE.subtitle}
            </p>
          </header>
          <div />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12 xl:gap-14 items-start">
          {/* Contact Form */}
          <section
            className="bg-muted border border-border p-6 sm:p-8"
            aria-labelledby="contact-form-heading"
          >
            <h2
              id="contact-form-heading"
              className="text-lg font-bold text-foreground mb-6"
            >
              {CONTACT_PAGE.formTitle}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <span className="block text-sm font-medium text-foreground mb-1">
                    {CONTACT_FORM_LABELS.fullName} *
                  </span>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={CONTACT_FORM_LABELS.fullName}
                    className="w-full px-3 py-2.5 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </label>
                <label className="block">
                  <span className="block text-sm font-medium text-foreground mb-1">
                    {CONTACT_FORM_LABELS.email} *
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={CONTACT_FORM_LABELS.email}
                    className="w-full px-3 py-2.5 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </label>
              </div>
              <label className="block">
                <span className="block text-sm font-medium text-foreground mb-1">
                  {CONTACT_FORM_LABELS.subject} *
                </span>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={CONTACT_FORM_LABELS.subject}
                  className="w-full px-3 py-2.5 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </label>
              <label className="block">
                <span className="block text-sm font-medium text-foreground mb-1">
                  {CONTACT_FORM_LABELS.message} *
                </span>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={CONTACT_FORM_LABELS.message}
                  className="w-full px-3 py-2.5 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-y min-h-[100px]"
                />
              </label>
              <button
                type="submit"
                className="px-5 py-2.5 bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
              >
                {CONTACT_PAGE.sendButtonLabel}
              </button>
            </form>
          </section>

          {/* Nedf's Contact Information */}
          <section aria-labelledby="company-info-heading">
            <h2
              id="company-info-heading"
              className="text-lg font-bold text-foreground mb-6"
            >
              {CONTACT_PAGE.companyInfoTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {CONTACT_CARDS.map(({ key, label, value, icon: Icon, href }) => (
                <div
                  key={key}
                  className="border border-border bg-card p-4 flex gap-3"
                >
                  <div className="shrink-0 w-10 h-10 flex items-center justify-center bg-primary text-primary-foreground">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-foreground">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors underline break-all"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm text-muted-foreground">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-bold text-foreground mb-3">
                {CONTACT_PAGE.socialLabel}
              </p>
              <div className="flex gap-3 sm:gap-3 md:gap-4 lg:gap-4 xl:gap-4 justify-start flex-wrap">
                {SOCIAL_LINKS.map(({ name, href }) => {
                  const Icon = SOCIAL_ICONS[name];
                  if (!Icon) return null;
                  return (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      className={cn(
                        "w-7 h-7 sm:w-8 sm:h-8 md:w-8 md:h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10",
                        "rounded-full border border-border flex items-center justify-center",
                        "text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary",
                        "transition-all duration-300 hover:scale-110 active:scale-95"
                      )}
                    >
                      <Icon size={14} className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-4 lg:h-4 xl:w-5 xl:h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>

      <Subscription />
    </div>
  );
}
