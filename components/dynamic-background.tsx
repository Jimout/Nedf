"use client"

import { useEffect, useState } from "react"

export function DynamicBackground() {
  const [isDark, setIsDark] = useState(false)
  
  console.log("DynamicBackground rendering, isDark:", isDark)

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    
    checkTheme()
    
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    
    return () => observer.disconnect()
  }, [])

  // Light mode: no grid background
  const lightModeGrid = "none"
  
  // Dark mode: also no grid background now
  const darkModeGrid = "none"

  return (
    <div
      className="fixed inset-0 w-full h-full bg-white dark:bg-[#15171a] transition-colors duration-300"
      style={{
        zIndex: 0,
        backgroundImage: isDark ? darkModeGrid : lightModeGrid,
        backgroundRepeat: "no-repeat",
        backgroundSize: "auto",
        pointerEvents: "none",
      }}
    />
  )
}
