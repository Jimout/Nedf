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
      className={cn(
        "scroll-mt-20 font-montserrat",
        "pt-12 sm:pt-14 md:pt-16 lg:pt-20 xl:pt-20 2xl:pt-24",
        "pb-16 sm:pb-20 md:pb-20 lg:pb-24 xl:pb-24 2xl:pb-28"
      )}
      aria-labelledby="studio-notes-heading"
    >
      <div className="relative w-full">
        <div
          className={cn(
            "relative w-full overflow-hidden bg-muted",
            "min-h-[200px] sm:min-h-[240px] md:min-h-[280px] lg:min-h-[320px] xl:min-h-[360px] 2xl:min-h-[400px]"
          )}
        >
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
          <div
            className={cn(
              "absolute flex items-center justify-center",
              "inset-y-2 inset-x-4 sm:inset-y-3 sm:inset-x-6 md:inset-y-4 md:inset-x-8 lg:inset-y-5 lg:inset-x-12 xl:inset-y-6 xl:inset-x-16 2xl:inset-y-8 2xl:inset-x-20"
            )}
          >
            <Link
              href="/blog"
              className={cn(
                "flex w-full flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-8 xl:gap-10 2xl:gap-12 sm:flex-row sm:items-center sm:justify-between",
                "border border-border bg-background text-foreground shadow-lg",
                "p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10 2xl:p-12",
                "transition-transform hover:scale-[1.01]"
              )}
            >
              <div className="min-w-0 flex-1">
                <h2
                  id="studio-notes-heading"
                  className="mb-2 sm:mb-2.5 md:mb-3 lg:mb-4 xl:mb-6 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-5xl font-bold leading-tight tracking-tight"
                >
                  {STUDIO_NOTES_HEADING}
                </h2>
                <p className="text-xs sm:text-sm md:text-base lg:text-base xl:text-lg text-muted-foreground">
                  {SITE.studioNotesTagline}
                </p>
              </div>

              <div className="mt-2 flex shrink-0 items-center justify-end sm:mt-0">
                <span
                  className={cn(
                    "flex h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 xl:h-11 xl:w-11 items-center justify-center rounded-full",
                    "bg-primary text-primary-foreground",
                    "transition-transform hover:scale-110"
                  )}
                  aria-hidden
                >
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-5 md:w-5 lg:h-6 lg:w-6 xl:h-6 xl:w-6" strokeWidth={2.5} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
