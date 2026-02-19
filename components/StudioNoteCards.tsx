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
        "pt-12 sm:pt-14 md:pt-16 lg:pt-20 xl:pt-20 2xl:pt-24 3xl:pt-[112px] 4xl:pt-32",
        "pb-16 sm:pb-20 md:pb-20 lg:pb-24 xl:pb-24 2xl:pb-[112px] 3xl:pb-32 4xl:pb-36"
      )}
      aria-labelledby="studio-notes-heading"
    >
      <div className="relative w-full">
        <div
          className={cn(
            "relative w-full overflow-hidden bg-muted",
            "min-h-[260px] sm:min-h-[300px] md:min-h-[360px] lg:min-h-[420px] xl:min-h-[480px] 2xl:min-h-[540px] 3xl:min-h-[600px] 4xl:min-h-[660px]"
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
              "inset-y-3 inset-x-4 sm:inset-y-4 sm:inset-x-6 md:inset-y-5 md:inset-x-8 lg:inset-y-6 lg:inset-x-10 xl:inset-y-8 xl:inset-x-14 2xl:inset-y-10 2xl:inset-x-16 3xl:inset-y-12 3xl:inset-x-20 4xl:inset-y-14 4xl:inset-x-24"
            )}
          >
            <Link
              href="/blog"
              className={cn(
                "flex w-full flex-col gap-5 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-14 sm:flex-row sm:items-center sm:justify-between",
                "border border-border bg-background text-foreground shadow-lg",
                "p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 2xl:p-16 3xl:p-20 4xl:p-24",
                "transition-transform hover:scale-[1.01]"
              )}
            >
              <div className="min-w-0 flex-1">
                <h2
                  id="studio-notes-heading"
                  className="mb-3 sm:mb-3 md:mb-4 lg:mb-5 xl:mb-6 2xl:mb-7 3xl:mb-8 4xl:mb-10 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-5xl 3xl:text-6xl 4xl:text-7xl font-bold leading-tight tracking-tight"
                >
                  {STUDIO_NOTES_HEADING}
                </h2>
                <p className="text-sm sm:text-base md:text-base lg:text-lg xl:text-lg 2xl:text-xl text-muted-foreground">
                  {SITE.studioNotesTagline}
                </p>
              </div>

              <div className="mt-2 flex shrink-0 items-center justify-end sm:mt-0">
                <span
                  className={cn(
                    "flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-11 lg:w-11 xl:h-12 xl:w-12 2xl:h-14 2xl:w-14 items-center justify-center rounded-full",
                    "bg-primary text-primary-foreground",
                    "transition-transform hover:scale-110"
                  )}
                  aria-hidden
                >
                  <ArrowRight className="h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-6 lg:w-6 xl:h-7 xl:w-7 2xl:h-8 2xl:w-8" strokeWidth={2.5} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
