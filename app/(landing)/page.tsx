"use client"

import AnimatedTestimonials from "@/components/AnimatedTestimonials"
import Hero from "@/components/Hero"
import { Navbar } from "@/components/Navbar"
import { OurTeam } from "@/components/OurTeam"
import Portfolio from "@/components/Portfolio"
import HeroTextFadeScroll from "@/components/Slogan"
import Subscription from "@/components/Subscription"
import { TheCrew } from "@/components/TheCrew"
import StudioNotesPage from "@/components/StudioNotes"
import Steps from "@/components/Steps"
import ServicesSection from "@/components/services"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Wait for splash screen to finish (3 seconds + small buffer)
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 3200)
    return () => clearTimeout(timer)
  }, [])

  if (!showContent) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        {/* Empty div to prevent layout shift - matches splash screen background */}
      </div>
    )
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="min-h-screen flex flex-col relative z-10"
        style={{ pointerEvents: 'auto' }}
      >
        <Navbar />
        <Hero />
        <HeroTextFadeScroll />
        <ServicesSection />
        <Portfolio />
        <TheCrew />
        <Steps />
        <OurTeam />
        <AnimatedTestimonials />
        
        <p className="text-center text-3xl font-bold sm:text-4xl font-montserrat tracking-tight pt-8 mb-12" style={{ color: '#ec1e24' }}>
          STUDIO NOTES
        </p>
        <StudioNotesPage />
        <Subscription />
       
      </motion.div>
    </>
  )
}
