"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/Navbar"
import Hero from "@/components/Hero"
import Portfolio from "@/components/Portfolio"
import StudioNotesPage from "@/components/StudioNotes"
import { ClientReflections } from "@/components/ClientReflections"
import { TheCrew } from "@/components/TheCrew"
import Footer from "@/components/Footer"
import SplashScreen from "@/components/SplashScreen"

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
          className="min-h-screen flex flex-col"
        >
          <Navbar />
          <Hero />
          <Portfolio />
          <StudioNotesPage />
          <ClientReflections />
          <TheCrew />
          <Footer />
        </motion.div>
      )}
    </>
  )
}
