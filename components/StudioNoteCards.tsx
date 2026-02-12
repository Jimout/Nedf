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
      id="studio-notes"
      className="scroll-mt-20 py-12 md:py-16"
      aria-labelledby="studio-notes-heading"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="relative aspect-[16/6] w-full overflow-hidden bg-muted">
          {/* Background image */}
          <Image
            src="/room1.jpg"
            alt="Studio notes background"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 80vw"
            priority={false}
          />
          {/* Subtle overlay to keep text readable using system background color */}
          <div className="absolute inset-0 bg-background/40" aria-hidden />

          {/* Foreground card */}
          <div className="absolute inset-y-1 inset-x-10 sm:inset-y-3 sm:inset-x-24 flex items-center justify-center">
            <Link
              href="/blog"
              className={cn(
                "flex w-full max-w-xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between",
                "border border-border bg-background text-foreground shadow-lg",
                "px-6 py-14 sm:px-10 sm:py-16",
                "font-montserrat transition-transform hover:scale-[1.01]"
              )}
            >
              <div className="min-w-0 flex-1">
                <h2
                  id="studio-notes-heading"
                  className="text-2xl font-bold leading-tight tracking-tight sm:text-3xl md:text-4xl"
                >
                  {STUDIO_NOTES_HEADING}
                </h2>
                <p className="mt-4 text-sm text-muted-foreground sm:text-base">
                  {SITE.studioNotesTagline}
                </p>
              </div>

              <div className="mt-4 flex shrink-0 items-center justify-end sm:mt-0">
                <span
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full",
                    "bg-primary text-primary-foreground",
                    "transition-transform hover:scale-110"
                  )}
                  aria-hidden
                >
                  <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
