"use client"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"

export const BackgroundBoxes = ({ className }: { className?: string }) => {
  const rows = new Array(150).fill(1)
  const cols = new Array(100).fill(1)
  const colors = ["#001F4B05", "#1e40af05", "#3b82f605", "#1d4ed805", "#1e3a8a05"]
  const darkColors = ["#ec1e2433", "#ec1e2433", "#ec1e2433", "#ec1e2433", "#ec1e2433"]
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }
    
    checkTheme()
    
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    
    return () => observer.disconnect()
  }, [])

  const getRandomColor = () => {
    const colorArray = isDark ? darkColors : colors
    return colorArray[Math.floor(Math.random() * colorArray.length)]
  }

  return (
    <div
      style={{
        transform: `translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute left-1/4 p-4 -top-1/4 flex -translate-x-1/2 -translate-y-1/2 w-full h-full z-0 transition-colors duration-300",
        className,
      )}
    >
      {rows.map((_, i) => (
        <motion.div key={`row` + i} className="w-16 h-8 border-l border-slate-300/25 dark:border-white/5 relative transition-colors duration-300">
          {cols.map((_, j) => (
            <motion.div
              whileHover={{
                backgroundColor: getRandomColor(),
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              animate={{
                transition: { duration: 2 },
              }}
              key={`col` + j}
              className="w-16 h-8 border-r border-t border-slate-300/25 dark:border-white/5 relative cursor-pointer transition-colors duration-300"
            >
            </motion.div>
          ))}
        </motion.div>
      ))}
    </div>
  )
}