"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon">
        <Sun className="h-[1.2rem] w-[1.2rem] transition-all duration-300 hover:scale-110 hover:rotate-12" style={{ color: '#002e47', filter: 'brightness(1.2)' }} />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="transition-all duration-300 hover:bg-white/50 rounded-lg"
    >
      <Sun className={`h-[1.2rem] w-[1.2rem] transition-all duration-300 hover:scale-110 hover:rotate-12 ${isDark ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`} style={{ color: '#002e47', filter: 'brightness(1.2)' }} />
      <Moon className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-300 hover:scale-110 hover:-rotate-12 ${isDark ? "rotate-0 scale-100" : "rotate-90 scale-0"}`} style={{ color: '#ec1e24' }} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
