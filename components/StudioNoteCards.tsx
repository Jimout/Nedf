"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";

const STUDIO_NOTES_HEADING = "Insights, Stories, and Social Impact";

export function StudioNotesCard() {
  return (
    <section
      className={cn(
        "font-montserrat",
        "pt-0",
        "pb-8 sm:pb-10 md:pb-12 lg:pb-14 xl:pb-16 2xl:pb-20 3xl:pb-24 4xl:pb-28"
      )}
      aria-labelledby="studio-notes-heading"
    >
      <div className="relative w-full">
        <div className="relative w-full min-h-[82svh] bg-muted">
          {/* Background + overlay; overflow hidden keeps image within the strip as it grows */}
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src="/room1.jpg"
              alt="Studio notes background"
              fill
              className="object-cover"
              sizes="100vw"
              priority={false}
            />
            <div className="absolute inset-0 bg-background/40" aria-hidden />
          </div>

          {/* In-flow layer grows with card so all content stays visible (no scroll / no clip) */}
          <div
            className={cn(
              "relative z-10 flex min-h-[82svh] items-center justify-center",
              "p-[clamp(0.75rem,3vw,2.5rem)]"
            )}
          >
            <Link
              href="/blog"
              className={cn(
                "flex w-[min(86vw,72rem)] max-w-full shrink-0 flex-col text-left",
                /* Large desktops through 4xl: single row, text flexes, CTA fixed (not stacked) */
                "lg:flex-row lg:items-center lg:justify-between lg:gap-8 xl:gap-10 2xl:gap-12 3xl:gap-14 4xl:gap-16",
                /* At least viewport-sized; grows with heading + body + CTA */
                "min-h-[min(58svh,52rem)]",
                "border border-border bg-background text-foreground shadow-lg",
                "p-8 sm:p-10 md:p-12 lg:p-14 xl:p-16",
                "transition-transform hover:scale-[1.01]"
              )}
            >
              <div className="min-w-0 shrink-0 lg:flex-1">
                <h2
                  id="studio-notes-heading"
                  className="mb-3 text-xl font-bold leading-tight tracking-tight sm:mb-4 sm:text-2xl md:mb-5 md:text-3xl lg:mb-6 lg:text-5xl xl:mb-7 xl:text-6xl 2xl:mb-8 2xl:text-7xl 3xl:text-8xl 4xl:text-9xl"
                >
                  {STUDIO_NOTES_HEADING}
                </h2>
                <p className="max-w-2xl text-sm text-muted-foreground sm:text-base md:text-lg lg:max-w-none">
                  {SITE.studioNotesTagline}
                </p>
              </div>

              <div className="mt-auto flex shrink-0 justify-end pt-6 sm:pt-8 md:pt-10 lg:mt-0 lg:justify-end lg:pt-0">
                <span
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-full sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16",
                    "bg-primary text-primary-foreground",
                    "transition-transform hover:scale-110"
                  )}
                  aria-hidden
                >
                  <ArrowRight
                    className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7"
                    strokeWidth={2.5}
                  />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
