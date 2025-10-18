"use client"

import { ClientReflections } from "@/components/ClientReflections"
import Hero from "@/components/Hero"
import { Navbar } from "@/components/Navbar"
import Portfolio from "@/components/Portfolio"
import SplashScreen from "@/components/SplashScreen"
import StudioNotesPage from "@/components/StudioNotes"
import { TheCrew } from "@/components/TheCrew"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function HomePage() {
  const [showContent, setShowContent] = useState(false)
  const [showSplash, setShowSplash] = useState(false)

  useEffect(() => {
    // Check if splash screen has already been shown in this session
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash")
    
    if (!hasSeenSplash) {
      // First visit - show splash screen
      setShowSplash(true)
      const timer = setTimeout(() => {
        setShowContent(true)
        sessionStorage.setItem("hasSeenSplash", "true")
      }, 2500)
      return () => clearTimeout(timer)
    } else {
      // Returning to home - skip splash screen
      setShowContent(true)
    }
  }, [])

  return (
    <>
      {showSplash && <SplashScreen />}
      {showContent && (
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
          <p className="text-center text-[26px] md:text-[30px] font-medium mb-8">
        STUDIO NOTES
      </p>
          <StudioNotesPage />
          <ClientReflections />
          <TheCrew />
        </motion.div>
      )}
    </>
  )
}
