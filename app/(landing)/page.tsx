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
        <HeroWithStats />
        <HeroTextFadeScroll />
        <ServicesSection />
        <Portfolio />
        <TheCrew />
        <Steps />
        {/* Studio notes section: stack on mobile, responsive heading */}
        <div id="studio-notes" className="scroll-mt-16 sm:scroll-mt-20 md:scroll-mt-20 lg:scroll-mt-24">
          <p className="text-center text-2xl font-bold sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl 3xl:text-6xl 4xl:text-6xl font-montserrat tracking-tight pt-6 sm:pt-8 md:pt-8 lg:pt-10 xl:pt-12 2xl:pt-12 mb-8 sm:mb-10 md:mb-12 lg:mb-12 xl:mb-14 2xl:mb-16 text-[#333333]/80 dark:text-[#ec1e24]">
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
