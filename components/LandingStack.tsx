"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroWithStats from "@/components/Hero";
import HeroTextFadeScroll from "@/components/Slogan";
import ServicesSection from "@/components/services";

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
      <ServicesSection stacked />
    </div>
  );
}
