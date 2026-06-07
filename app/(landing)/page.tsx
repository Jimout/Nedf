"use client";

import { useEffect } from "react";
import { LandingStack } from "@/components/LandingStack";
import Portfolio from "@/components/Portfolio";
import { StudioNotesCard } from "@/components/StudioNoteCards";
import SlidingTestimonials from "@/components/ClientReflections";
import Subscription from "@/components/Subscription";
import { cn } from "@/lib/utils";
import { SECTION_TITLE_SCALE, TYPE } from "@/lib/typography";

const Index = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-14 sm:pt-14 md:pt-14 lg:pt-14 xl:pt-16 2xl:pt-16 3xl:pt-20 4xl:pt-24">
        <LandingStack />
        <Portfolio />
        <div id="studio-notes" className="scroll-mt-16 sm:scroll-mt-20 md:scroll-mt-20 lg:scroll-mt-24">
          <p
            className={cn(
              "text-center pt-8 sm:pt-10 md:pt-12 lg:pt-14 xl:pt-16 2xl:pt-20 3xl:pt-24 4xl:pt-28",
              "mb-8 sm:mb-9 md:mb-10 lg:mb-11 xl:mb-12 2xl:mb-14 3xl:mb-16 4xl:mb-20",
              TYPE.sectionTitle,
              SECTION_TITLE_SCALE
            )}
          >
            STUDIO NOTES
          </p>
          <StudioNotesCard />
        </div>
        <SlidingTestimonials />
        <Subscription />
      </main>
    </div>
  );
};

export default Index;
