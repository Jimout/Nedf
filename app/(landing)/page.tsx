"use client"

import SlidingTestimonials from "@/components/ClientReflections"
import Hero from "@/components/Hero"
import { OurTeam } from "@/components/OurTeam"
import Portfolio from "@/components/Portfolio"
import HeroTextFadeScroll from "@/components/Slogan"
import Subscription from "@/components/Subscription"
import { TheCrew } from "@/components/TheCrew"
import { StudioNotesCard } from "@/components/StudioNoteCards"
import Steps from "@/components/Steps"
import ServicesSection from "@/components/services"
import { motion } from "framer-motion"
import { useEffect } from "react"

export default function HomePage() {
  // Reset scroll on load/refresh so hero is visible (avoids footer flash from scroll restoration)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" })
  }, [])

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="min-h-screen flex flex-col relative z-10"
        style={{ pointerEvents: 'auto' }}
      >
        <Hero />
        <HeroTextFadeScroll />
        <ServicesSection />
        <Portfolio />
        <TheCrew />
        <Steps />
        <OurTeam />
        <SlidingTestimonials />
        
        <div id="studio-notes" className="scroll-mt-20">
          <p className="text-center text-3xl font-bold sm:text-4xl font-montserrat tracking-tight pt-8 mb-12 text-[#333333]/80 dark:text-[#ec1e24]">
            STUDIO NOTES
          </p>
          <StudioNotesCard />
        </div>
        <Subscription />
       
      </motion.div>
    </>
  )
}
