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
      <Button 
        variant="ghost" 
        size="icon"
        className="2xl:w-14 2xl:h-14 3xl:w-16 3xl:h-16 4xl:w-[4.5rem] 4xl:h-[4.5rem]"
      >
        <Sun 
          className="h-[1.2rem] w-[1.2rem] 2xl:h-[2rem] 2xl:w-[2rem] 3xl:h-[2.25rem] 3xl:w-[2.25rem] 4xl:h-[2.5rem] 4xl:w-[2.5rem] text-accent transition-all duration-300 hover:scale-110 hover:rotate-12" 
        />
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
      className="transition-all duration-300 hover:bg-muted rounded-lg 2xl:w-14 2xl:h-14 3xl:w-16 3xl:h-16 4xl:w-[4.5rem] 4xl:h-[4.5rem]"
    >
      <Sun 
        className={`h-[1.2rem] w-[1.2rem] 2xl:h-[2rem] 2xl:w-[2rem] 3xl:h-[2.25rem] 3xl:w-[2.25rem] 4xl:h-[2.5rem] 4xl:w-[2.5rem] text-accent transition-all duration-300 hover:scale-110 hover:rotate-12 ${isDark ? "-rotate-90 scale-0" : "rotate-0 scale-100"}`} 
      />
      <Moon 
        className={`absolute h-[1.2rem] w-[1.2rem] 2xl:h-[2rem] 2xl:w-[2rem] 3xl:h-[2.25rem] 3xl:w-[2.25rem] 4xl:h-[2.5rem] 4xl:w-[2.5rem] text-accent transition-all duration-300 hover:scale-110 hover:-rotate-12 ${isDark ? "rotate-0 scale-100" : "rotate-90 scale-0"}`} 
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
