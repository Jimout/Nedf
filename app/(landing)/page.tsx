"use client"

import { ClientReflections } from "@/components/ClientReflections"
import Hero from "@/components/Hero"
import { Navbar } from "@/components/Navbar"
import Portfolio from "@/components/Portfolio"
import StudioNotesPage from "@/components/StudioNotes"
import { TheCrew } from "@/components/TheCrew"
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
      <p className="text-center text-[26px] md:text-[30px] font-medium mb-8">
        STUDIO NOTES
      </p>
      <StudioNotesPage />
      <ClientReflections />
      <TheCrew />
    </motion.div>
  )
}
