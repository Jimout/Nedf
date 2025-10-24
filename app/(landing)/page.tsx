"use client"

import ClientReflections from "@/components/ClientReflections"
import FloatingSubscription from "@/components/FloatingSubscription"
import Hero from "@/components/Hero"
import { Navbar } from "@/components/Navbar"
import { OurTeam } from "@/components/OurTeam"
import Portfolio from "@/components/Portfolio"
import Subscription from "@/components/Subscription"
import { TheCrew } from "@/components/TheCrew"
import StudioNotesPage from "@/components/StudioNotes"
import Steps from "@/components/Steps"
import { Services } from "@/components/services"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Wait for splash screen to finish (5 seconds + small buffer)
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 5200)
    return () => clearTimeout(timer)
  }, [])

  if (!showContent) {
    return (
      <div className="min-h-screen bg-[#15171a] flex items-center justify-center">
        {/* Empty div to prevent layout shift */}
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen flex flex-col relative z-10"
      style={{ pointerEvents: 'auto' }}
    >
      <Navbar />
      <Hero />
      <Portfolio />
      <Services />
      <p className="text-center text-[28px] md:text-[32px] font-medium text-[#333333] dark:text-[#ec1e24] font-montserrat tracking-wider pt-20 mb-12">
        STUDIO NOTES
      </p>
      <StudioNotesPage />
      <Steps />
      
      <TheCrew />
     
      
      
      <OurTeam />
      <ClientReflections/>
      <Subscription />
      <FloatingSubscription />
     
    </motion.div>
  )
}
