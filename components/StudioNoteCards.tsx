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
        "pb-16 sm:pb-20 md:pb-20 lg:pb-24 xl:pb-24 2xl:pb-[112px] 3xl:pb-32 4xl:pb-36",
        "2xl:w-screen 2xl:relative 2xl:left-1/2 2xl:-ml-[50vw]",
        "2xl:px-16 3xl:px-20 4xl:px-24"
      )}
      aria-labelledby="studio-notes-heading"
    >
      <div className="relative w-full">
          <div
            className={cn(
              "relative w-full overflow-hidden bg-muted",
              "min-h-[260px] sm:min-h-[300px] md:min-h-[360px] lg:min-h-[420px] xl:min-h-[480px] 2xl:min-h-[700px] 3xl:min-h-[800px] 4xl:min-h-[1000px]"
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

          {/* Foreground card - narrower width, more height to hold content */}
          <div
            className={cn(
              "absolute flex items-center justify-center",
              "inset-y-2 inset-x-4 sm:inset-y-3 sm:inset-x-6 md:inset-y-4 md:inset-x-8 lg:inset-y-5 lg:inset-x-10 xl:inset-y-6 xl:inset-x-12 2xl:inset-y-4 2xl:inset-x-16 3xl:inset-y-4 3xl:inset-x-20 4xl:inset-y-4 4xl:inset-x-24"
            )}
          >
            <Link
              href="/blog"
              className={cn(
                "flex w-full flex-col gap-5 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-20 3xl:gap-24 4xl:gap-28 sm:flex-row sm:items-center sm:justify-between",
                "border border-border bg-background text-foreground shadow-lg",
                "p-6 sm:p-8 md:p-10 lg:p-12 xl:p-14 2xl:p-[32px] 3xl:p-[40px] 4xl:p-[48px]",
                "transition-transform hover:scale-[1.01]"
              )}
            >
              <div className="min-w-0 flex-1">
                <h2
                  id="studio-notes-heading"
                  className="mb-3 sm:mb-3 md:mb-4 lg:mb-5 xl:mb-6 2xl:mb-7 3xl:mb-8 4xl:mb-10 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-7xl 3xl:text-8xl 4xl:text-9xl font-bold leading-tight tracking-tight"
                >
                  {STUDIO_NOTES_HEADING}
                </h2>
                <p className="text-sm sm:text-base md:text-base lg:text-lg xl:text-lg 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl text-muted-foreground">
                  {SITE.studioNotesTagline}
                </p>
              </div>

              <div className="mt-2 flex shrink-0 items-center justify-end sm:mt-0">
                <span
                  className={cn(
                    "flex h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 lg:h-11 lg:w-11 xl:h-12 xl:w-12 2xl:h-24 2xl:w-24 3xl:h-28 3xl:w-28 4xl:h-32 4xl:w-32 items-center justify-center rounded-full",
                    "bg-primary text-primary-foreground",
                    "transition-transform hover:scale-110"
                  )}
                  aria-hidden
                >
                  <ArrowRight className="h-5 w-5 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-6 lg:w-6 xl:h-7 xl:w-7 2xl:h-10 2xl:w-10 3xl:h-12 3xl:w-12 4xl:h-14 4xl:w-14" strokeWidth={2.5} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
