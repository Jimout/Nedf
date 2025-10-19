"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import SplashScreen from "./SplashScreen"

export default function SplashScreenWrapper() {
  const [showSplash, setShowSplash] = useState(false)
  const [isHomePage, setIsHomePage] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === "/") {
      setIsHomePage(true)
      // Show splash screen immediately
      setShowSplash(true)
      const timer = setTimeout(() => {
        setShowSplash(false)
      }, 5000)
      return () => clearTimeout(timer)
    } else {
      setIsHomePage(false)
      setShowSplash(false)
    }
  }, [pathname])

  // If it's the home page, always show splash screen first
  if (isHomePage && showSplash) {
    return <SplashScreen />
  }

  return null
}
