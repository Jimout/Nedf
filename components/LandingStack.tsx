"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroWithStats from "@/components/Hero";
import HeroTextFadeScroll from "@/components/Slogan";
import ServicesSection from "@/components/services";

const STICKY_TOP =
  "top-14 sm:top-14 md:top-14 lg:top-14 xl:top-16 2xl:top-16 3xl:top-20 4xl:top-24";

const VIEWPORT_PANEL =
  "min-h-[calc(100dvh-3.5rem)] sm:min-h-[calc(100dvh-3.5rem)] md:min-h-[calc(100dvh-3.5rem)] lg:min-h-[calc(100dvh-3.5rem)] xl:min-h-[calc(100dvh-4rem)] 2xl:min-h-[calc(100dvh-4rem)] 3xl:min-h-[calc(100dvh-5rem)] 4xl:min-h-[calc(100dvh-6rem)]";

export function LandingStack() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(refresh);
    const timer = window.setTimeout(refresh, 200);
    window.addEventListener("load", refresh);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", refresh);
    };
  }, []);

  return (
    <div className="relative">
      <HeroWithStats />
      <HeroTextFadeScroll />
      <ServicesSection
        stacked
        stickyTopClass={STICKY_TOP}
        viewportPanelClass={VIEWPORT_PANEL}
      />
    </div>
  );
}
