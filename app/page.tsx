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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <SplashScreen />
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
