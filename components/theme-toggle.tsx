"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useCallback, useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function applyTheme(setTheme: (theme: string) => void, next: "light" | "dark") {
  if (typeof document !== "undefined" && "startViewTransition" in document) {
    document.startViewTransition(() => {
      setTheme(next)
    })
    return
  }
  setTheme(next)
}

const toggleClass =
  "shadow-none hover:translate-y-0 hover:bg-muted/50 active:bg-muted/70 transition-colors duration-200 2xl:w-14 2xl:h-14 3xl:w-16 3xl:h-16 4xl:w-[4.5rem] 4xl:h-[4.5rem]"

const iconClass =
  "h-[1.2rem] w-[1.2rem] 2xl:h-[2rem] 2xl:w-[2rem] 3xl:h-[2.25rem] 3xl:w-[2.25rem] 4xl:h-[2.5rem] 4xl:w-[2.5rem] text-accent transition-opacity duration-200 group-hover:opacity-80"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleToggle = useCallback(() => {
    const next = resolvedTheme === "dark" ? "light" : "dark"
    applyTheme(setTheme, next)
  }, [resolvedTheme, setTheme])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className={cn(toggleClass, "group")}>
        <Sun className={iconClass} />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <Button variant="ghost" size="icon" onClick={handleToggle} className={cn(toggleClass, "group")}>
      {isDark ? <Moon className={iconClass} /> : <Sun className={iconClass} />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
