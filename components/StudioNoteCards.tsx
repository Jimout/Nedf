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
      className="w-full pb-8 sm:pb-10 md:pb-12 lg:pb-14 xl:pb-16 2xl:pb-20 3xl:pb-24 4xl:pb-28"
      aria-labelledby="studio-notes-heading"
    >
      <Link
        href="/blog"
        className={cn(
          "group relative block w-full overflow-hidden rounded-none",
          "min-h-[320px] sm:min-h-[360px] md:min-h-[400px] lg:min-h-[440px] xl:min-h-[480px]",
          "2xl:min-h-[calc(80dvh-4rem)] 3xl:min-h-[calc(80dvh-5rem)] 4xl:min-h-[calc(80dvh-6rem)]",
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
          className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"
          aria-hidden
        />

        <div
          className={cn(
            "absolute inset-x-0 bottom-0 z-10 flex flex-col items-center text-center",
            "px-6 pb-10 pt-16 sm:px-8 sm:pb-12 sm:pt-20 md:px-10 md:pb-14",
            "lg:px-12 lg:pb-16 2xl:px-16 2xl:pb-20 3xl:px-20 3xl:pb-24 4xl:px-24 4xl:pb-28"
          )}
        >
          <p
            className={cn(
              "font-montserrat font-medium uppercase tracking-[0.2em] text-white/90",
              "text-[10px] sm:text-xs lg:text-sm 2xl:text-lg 3xl:text-xl 4xl:text-2xl"
            )}
          >
            From the studio
          </p>

          <h2
            id="studio-notes-heading"
            className={cn(
              "font-montserrat font-bold tracking-tight text-white",
              "mt-3 max-w-4xl leading-[1.1]",
              "text-xl sm:mt-4 sm:text-2xl md:text-3xl lg:mt-5 lg:text-4xl",
              "xl:text-5xl 2xl:mt-8 2xl:max-w-5xl 2xl:text-6xl 3xl:mt-10 3xl:max-w-6xl 3xl:text-7xl 4xl:mt-12 4xl:max-w-6xl 4xl:text-8xl"
            )}
          >
            {STUDIO_NOTES_HEADING}
          </h2>

          <p
            className={cn(
              "font-montserrat font-normal leading-relaxed text-white/95",
              "mt-4 max-w-2xl",
              "text-sm sm:mt-5 sm:text-base md:text-base lg:mt-6 lg:text-lg",
              "2xl:mt-10 2xl:max-w-4xl 2xl:text-2xl 3xl:mt-12 3xl:max-w-4xl 3xl:text-3xl 4xl:mt-14 4xl:max-w-5xl 4xl:text-3xl"
            )}
          >
            {SITE.studioNotesTagline}
          </p>

          <span
            className={cn(
              "mt-8 flex items-center justify-center rounded-full bg-primary text-primary-foreground",
              "h-12 w-12 sm:mt-10 sm:h-14 sm:w-14 lg:mt-12",
              "2xl:mt-16 2xl:h-[4.5rem] 2xl:w-[4.5rem] 3xl:mt-20 3xl:h-20 3xl:w-20 4xl:mt-24 4xl:h-24 4xl:w-24",
              "transition-[opacity,transform] duration-300 group-hover:scale-105"
            )}
            aria-hidden
          >
            <ArrowRight
              className="h-5 w-5 sm:h-6 sm:w-6 2xl:h-8 2xl:w-8 3xl:h-9 3xl:w-9 4xl:h-10 4xl:w-10 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2.5}
            />
          </span>

          <span className="sr-only">Read studio notes</span>
        </div>
      </Link>
    </section>
  );
}
