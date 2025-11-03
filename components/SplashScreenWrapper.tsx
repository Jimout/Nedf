"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import SplashScreen from "./SplashScreen"

export default function SplashScreenWrapper() {
  const [showSplash, setShowSplash] = useState(false)
  const [isHomePage, setIsHomePage] = useState(false)
  const [isPageReady, setIsPageReady] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === "/") {
      setIsHomePage(true)
      setShowSplash(true)
      
      // Wait for page to be ready
      const readyTimer = setTimeout(() => {
        setIsPageReady(true)
      }, 1000)
      
      // Hide splash screen after minimum time and page is ready
      const splashTimer = setTimeout(() => {
        setShowSplash(false)
      }, 3000)
      
      return () => {
        clearTimeout(readyTimer)
        clearTimeout(splashTimer)
      }
    } else {
      setIsHomePage(false)
      setShowSplash(false)
      setIsPageReady(true)
    }
  }, [pathname])

  // Ensure page background is always visible during transitions
  useEffect(() => {
    if (isHomePage) {
      document.body.style.backgroundColor = 'white'
    } else {
      document.body.style.backgroundColor = ''
    }
    
    return () => {
      document.body.style.backgroundColor = ''
    }
  }, [isHomePage])

  // If it's the home page, always show splash screen first
  if (isHomePage && showSplash) {
    return <SplashScreen />
  }

  return null
}
