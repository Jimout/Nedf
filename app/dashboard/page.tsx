"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
    }, 2800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <SplashScreen />
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{
              duration: 1.2,
              ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier for smooth professional feel
            }}
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
      </AnimatePresence>
    </>
  )
}
