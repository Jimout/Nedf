"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";
import { TYPE } from "@/lib/typography";

const STUDIO_NOTES_HEADING = "Insights, Stories, and Social Impact";

export function StudioNotesCard() {
  return (
    <section
      className="w-full pb-8 sm:pb-10 md:pb-12 lg:pb-14 xl:pb-16 2xl:pb-20 3xl:pb-24 4xl:pb-28"
      aria-labelledby="studio-notes-heading"
    >
      <Link
        href="/blog"
        className={cn(
          "group relative block w-full overflow-hidden rounded-none",
          "min-h-[320px] sm:min-h-[360px] md:min-h-[400px] lg:min-h-[440px]",
          "xl:min-h-[480px] 2xl:min-h-[520px] 3xl:min-h-[580px] 4xl:min-h-[640px]",
          "shadow-lg transition-shadow duration-300 hover:shadow-xl",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        )}
      >
        <Image
          src="/room1.jpg"
          alt="Studio interior"
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          sizes="100vw"
          priority={false}
        />

        <div
          className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-95"
          aria-hidden
        />

        <div
          className={cn(
            "relative z-10 flex min-h-[inherit] flex-col items-center justify-center text-center",
            "px-6 py-12 sm:px-8 sm:py-14 md:px-10 md:py-16 lg:px-12 lg:py-16",
            "xl:px-14 2xl:px-16 2xl:py-20 3xl:px-20 3xl:py-24 4xl:px-24 4xl:py-28"
          )}
        >
          <p
            className={cn(
              TYPE.eyebrow,
              "text-[10px] text-white/80 sm:text-xs lg:text-sm 2xl:text-base 3xl:text-lg 4xl:text-xl"
            )}
          >
            From the studio
          </p>

          <h2
            id="studio-notes-heading"
            className={cn(
              TYPE.headline,
              "mt-3 max-w-4xl leading-[1.1] text-white",
              "text-xl sm:mt-4 sm:text-2xl md:text-3xl lg:mt-5 lg:text-4xl",
              "xl:text-5xl 2xl:mt-6 2xl:text-5xl 3xl:mt-8 3xl:text-6xl 4xl:mt-10 4xl:text-7xl"
            )}
          >
            {STUDIO_NOTES_HEADING}
          </h2>

          <p
            className={cn(
              TYPE.body,
              "mt-4 max-w-2xl text-white/85",
              "text-sm sm:mt-5 sm:text-base md:text-base lg:mt-6 lg:text-lg",
              "2xl:mt-8 2xl:max-w-3xl 2xl:text-xl 3xl:mt-10 3xl:text-2xl 4xl:mt-12 4xl:text-2xl"
            )}
          >
            {SITE.studioNotesTagline}
          </p>

          <span
            className={cn(
              "mt-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground",
              "h-12 w-12 sm:mt-10 sm:h-14 sm:w-14 md:mt-10 lg:mt-12",
              "2xl:mt-14 2xl:h-16 2xl:w-16 3xl:mt-16 3xl:h-[4.5rem] 3xl:w-[4.5rem] 4xl:mt-16 4xl:h-20 4xl:w-20",
              "transition-[opacity,transform] duration-300 group-hover:opacity-90 group-hover:scale-105"
            )}
            aria-hidden
          >
            <ArrowRight
              className="h-5 w-5 sm:h-6 sm:w-6 2xl:h-7 2xl:w-7 3xl:h-8 3xl:w-8 4xl:h-9 4xl:w-9 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2.5}
            />
          </span>

          <span className="sr-only">Read studio notes</span>
        </div>
      </Link>
    </section>
  );
}
