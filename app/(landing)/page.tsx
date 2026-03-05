"use client";

import { useEffect } from "react";
import HeroWithStats from "@/components/Hero";
import HeroTextFadeScroll from "@/components/Slogan";
import ServicesSection from "@/components/services";
import Portfolio from "@/components/Portfolio";
import { TheCrew } from "@/components/TheCrew";
import Steps from "@/components/Steps";
import { StudioNotesCard } from "@/components/StudioNoteCards";
import { OurTeam } from "@/components/OurTeam";
import SlidingTestimonials from "@/components/ClientReflections";
import Subscription from "@/components/Subscription";

const Index = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Main: responsive top padding for fixed nav (mobile→4K) */}
      <main className="pt-14 sm:pt-14 md:pt-14 lg:pt-14 xl:pt-16 2xl:pt-16 3xl:pt-20 4xl:pt-24">
        <div className="2xl:w-screen 2xl:relative 2xl:left-1/2 2xl:-ml-[50vw] 2xl:px-16 3xl:px-20 4xl:px-24">
          <HeroWithStats />
        </div>
        <HeroTextFadeScroll />
        <ServicesSection />
        <Portfolio />
        <TheCrew />
        <Steps />
        {/* Studio notes section: stack on mobile, responsive heading */}
        <div id="studio-notes" className="scroll-mt-16 sm:scroll-mt-20 md:scroll-mt-20 lg:scroll-mt-24">
          <p className="text-center text-2xl font-bold sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-8xl 3xl:text-9xl 4xl:text-[7.5rem] font-montserrat tracking-tight pt-8 sm:pt-10 md:pt-12 lg:pt-14 xl:pt-16 2xl:pt-20 3xl:pt-24 4xl:pt-28 mb-8 sm:mb-9 md:mb-10 lg:mb-11 xl:mb-12 2xl:mb-14 3xl:mb-16 4xl:mb-20 text-foreground/80 dark:text-primary">
            STUDIO NOTES
          </p>
          <StudioNotesCard />
        </div>
        <OurTeam />
        <SlidingTestimonials />
        <Subscription />
      </main>
    </div>
  );
};

export default Index;
