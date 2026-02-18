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
      <main className="pt-14 xl:pt-16">
        <HeroWithStats />
        <HeroTextFadeScroll />
        <ServicesSection />
        <Portfolio />
        <TheCrew />
        <Steps />
        <div id="studio-notes" className="scroll-mt-20">
          <p className="text-center text-3xl font-bold sm:text-4xl font-montserrat tracking-tight pt-8 mb-12 text-[#333333]/80 dark:text-[#ec1e24]">
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
